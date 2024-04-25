#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Manager, SystemTray};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayEvent};

use std::fs;
use std::io::{Read, Write};
use std::net::UdpSocket;
use tauri::Error;

#[tauri::command]
fn send_to_bulb(ip: String, message: String) -> Result<(), Error> {
    let socket = UdpSocket::bind("0.0.0.0:49004")?;
	// println!("command:{}", message);
    socket.send_to(message.as_bytes(), format!("{}:38899", ip))?;
    Ok(())
}

#[tauri::command]
fn write_json(file_path: String, data: String) -> Result<(), Error> {
	let mut file = fs::File::create(file_path)?;
    file.write_all(data.as_bytes())?;
	Ok(())
}

#[tauri::command]
fn read_json(file_path: String) -> Result<String, Error> {
	let mut file: fs::File = fs::File::open(file_path)?; 
	let mut buf = String::new();
	file.read_to_string(&mut buf)?;
	Ok(buf)
}

fn main() {

	let tray_menu = SystemTrayMenu::new()
		.add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
	// .add_native_item(SystemTrayMenuItem::Separator)
	// .add_item(CustomMenuItem::new("hide".to_string(), "Hide"));

	let tray = SystemTray::new().with_menu(tray_menu);

  	tauri::Builder::default()
	  	.system_tray(tray)
		  .on_system_tray_event(|app, event| match event {
			SystemTrayEvent::LeftClick {
				position:_,
				size: _,
				..
			  } => {
				let window = app.get_window("main").unwrap();
				window.show().unwrap();
				window.set_focus().unwrap();
			}
			SystemTrayEvent::MenuItemClick { id, .. } => {
			  match id.as_str() {
				"quit" => {
				  std::process::exit(0);
				}
				_ => {}
			  }
			}
			_ => {}
		  })
		.on_window_event(|event| match event.event() {
		tauri::WindowEvent::CloseRequested { api, .. } => {
			event.window().hide().unwrap();
			api.prevent_close();
		}
		_ => {}
		})
		.invoke_handler(tauri::generate_handler![send_to_bulb, write_json, read_json])
    	.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
