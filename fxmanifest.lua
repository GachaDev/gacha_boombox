fx_version "cerulean"

description "A boombox script that play yt music"
author "gachaa"

lua54 'yes'

games {
  "gta5"
}

ui_page 'web/build/index.html'

client_script "client/**/*"
server_script "@oxmysql/lib/MySQL.lua"
server_script "server/**/*"

files {
	'web/build/index.html',
	'web/build/**/*',
}

dependencies {
  'oxmysql'
}