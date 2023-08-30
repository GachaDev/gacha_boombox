local speakers = {}
local isInUI = false
local playlistsLoaded = false
local reproInUi = -1

function SendReactMessage(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    isInUI = shouldShow
    SendReactMessage('setVisible', shouldShow)
    if shouldShow == false then
        reproInUi = -1
    end
end

function ShowHelpNotification(msg)
    AddTextEntry('HelpNotification', msg)
    BeginTextCommandDisplayHelp('HelpNotification')
    EndTextCommandDisplayHelp(0, false, true, -1)
end

function ShowNotification(msg)
    SetTextFont(fontId)
	SetNotificationTextEntry('STRING')
	AddTextComponentSubstringPlayerName(msg)
	DrawNotification(false, true)
end

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    cb({})
end)

function LoadSpeakers()
    TriggerCallback('gacha_boombox:callback:getBoomboxs', function(result)
        for k,v in pairs(result) do
            SendReactMessage('createRepro', '')
        end
        Wait(200)
        speakers = result
    end)
end

RegisterNUICallback('webLoaded', function()
    LoadSpeakers()
end)

RegisterNUICallback('playSong', function(data)
    TriggerServerEvent('gacha_boombox:server:Playsong', data)
end)

RegisterNUICallback('getNewPlaylist', function(data, cb)
    TriggerCallback('gacha_boombox:callback:getNewPlaylist', function(result)
        cb(result)
    end, data)
end)

RegisterNetEvent('gacha_boombox:client:notify', function(msg)
    ShowNotification(msg)
end)

RegisterNUICallback('tempChangeVolume', function (data)
    speakers[data.repro + 1].volume = data.volume
end)

RegisterNUICallback('changeDist', function(data)
    TriggerServerEvent('gacha_boombox:server:SyncNewDist', data)
end)

RegisterNUICallback('syncVolume', function(data)
    TriggerServerEvent('gacha_boombox:server:SyncNewVolume', data)
end)

RegisterNUICallback('deletePlayList', function(data)
    TriggerServerEvent('gacha_boombox:server:deletePlayList', data)
end)

RegisterNUICallback('importNewPlaylist', function(data)
    TriggerServerEvent('gacha_boombox:server:importNewPlaylist', data)
end)

RegisterNetEvent('gacha_boombox:client:updateBoombox', function(id, data)
    speakers[id] = data
    if (id - 1) == reproInUi then
        SendReactMessage('sendSongInfo', {author= speakers[id].playlistPLaying.songs[speakers[id].songId].author, name = speakers[id].playlistPLaying.songs[speakers[id].songId].name, url = speakers[id].url, volume = speakers[id].volume, dist = speakers[id].maxDistance, maxDuration = speakers[id].maxDuration, paused = speakers[id].paused, pausedTime = speakers[id].pausedTime})
    end
end)

RegisterNetEvent('gacha_boombox:client:updateVolume', function(id, vol)
    speakers[id].volume = vol
end)

RegisterNetEvent('gacha_boombox:client:updateDist', function(id, dist)
    speakers[id].maxDistance = dist
end)

RegisterNetEvent('gacha_boombox:client:insertSpeaker', function(data)
    table.insert(speakers, data)
    SendReactMessage('createRepro', data.url)
end)

RegisterNetEvent('gacha_boombox:client:deleteBoombox', function(id)
    speakers[id].permaDisabled = true
end)

RegisterNUICallback('prevSong', function(data)
    if data.repro == reproInUi then
        TriggerServerEvent('gacha_boombox:server:prevSong', data)
    end
end)

RegisterNUICallback('nextSong', function(data)
    if data.repro == reproInUi then
        TriggerServerEvent('gacha_boombox:server:nextSong', data)
    end
end)

RegisterNUICallback('pauseSong', function(data)
    if data.repro == reproInUi then
        TriggerServerEvent('gacha_boombox:server:pauseSong', data)
    end
end)

RegisterNUICallback('syncNewTime', function(data)
    if data.repro == reproInUi then
        TriggerServerEvent('gacha_boombox:server:syncNewTime', data)
    end
end)

Citizen.CreateThread(function()
    while true do
        local sleep = 500
        local player = PlayerPedId()
        local playerCoords = GetEntityCoords(player)
        for k,v in pairs(speakers) do
            local distance = #(v.coords - playerCoords)
            if distance < v.maxDistance + 10 and sleep >= 100 then
                sleep = 100
            end
            if distance < v.maxDistance and not v.permaDisabled then
                sleep = 5
                if not v.isPlaying and v.url ~= '' and not v.paused then
                    SendReactMessage('playSong', {repro = tonumber(k - 1), url = v.url, volume = v.volume, time = v.time})
                    v.isPlaying = true
                end
                if not v.paused then
                    SendReactMessage('changeVolume', {repro = tonumber(k - 1), volume = tonumber(v.volume - (distance * v.volume / v.maxDistance))})
                else
                    SendReactMessage('changeVolume', {repro = tonumber(k - 1), volume = 0})
                end
                DrawMarker(20, v.coords.x, v.coords.y, v.coords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.3, 0.3, 0, 0, 0, 255, false, false, false, true, false, false, false)
                if distance < 1.5 then
                    ShowHelpNotification('Presiona ~INPUT_CONTEXT~ para acceder al altavoz o ~INPUT_FRONTEND_RRIGHT~ para recogerlo')
                    if IsControlJustPressed(1, 38) then
                        SendReactMessage('setRepro', tonumber(k - 1))
                        if not playlistsLoaded then
                            SendReactMessage('getPlaylists')
                        end
                        if v.playlistPLaying.songs and v.playlistPLaying.songs[v.songId] then
                            SendReactMessage('sendSongInfo', {author= v.playlistPLaying.songs[v.songId].author, name = v.playlistPLaying.songs[v.songId].name, url = v.url, volume = v.volume, dist = v.maxDistance, maxDuration = v.maxDuration, paused = v.paused, pausedTime = v.pausedTime})
                        end
                        toggleNuiFrame(true)
                        reproInUi = k - 1
                    end
                    if IsControlJustPressed(0, 194) and not isInUI then
                        TriggerServerEvent('gacha_boombox:server:deleteBoombox', k, v.coords.x)
                    end
                end
            else
                if v.isPlaying then
                    SendReactMessage('stopSong', tonumber(k - 1))
                    v.isPlaying = false
                end
            end
        end
        Wait(sleep)
    end
end)

RegisterNUICallback('getPlaylists', function(_, cb)
    TriggerCallback('gacha_boombox:callback:getPlaylists', function(result)
        cb(result)
    end)
end)

RegisterNUICallback('addSong', function(data)
    TriggerServerEvent('gacha_boombox:server:addSong', data)
end)

RegisterNUICallback('deleteSongPlaylist', function(data)
    TriggerServerEvent('gacha_boombox:server:deleteSongPlaylist', data)
end)

RegisterNetEvent('gacha_boombox:client:resyncPlaylists', function ()
    SendReactMessage('getPlaylists')
end)