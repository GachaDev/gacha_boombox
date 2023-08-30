if Config.framework == 'qbcore' then
    QBCore = exports['qb-core']:GetCoreObject()
elseif Config.framework == 'custom' then
	--Import your framework
end

function DeleteItem(src)
    if Config.framework == 'qbcore' then
        local Player = QBCore.Functions.GetPlayer(src)
        Player.Functions.RemoveItem(Config.itemName, 1)
    elseif Config.framework == 'esx' then
        if ESX then
            local xPlayer = ESX.GetPlayerFromId(src)
            xPlayer.removeInventoryItem(Config.itemName, 1)
        else
            print('You need to import ESX in fxmanifest')
        end
    elseif Config.framework == 'custom' then
        --Import your remove item function
    end
end

function AddItem(src)
    if Config.framework == 'qbcore' then
        local Player = QBCore.Functions.GetPlayer(src)
        Player.Functions.AddItem(Config.itemName, 1)
    elseif Config.framework == 'esx' then
        if ESX then
            local xPlayer = ESX.GetPlayerFromId(src)
            xPlayer.addInventoryItem(Config.itemName, 1)
        else
            print('You need to import ESX in fxmanifest')
        end
    elseif Config.framework == 'custom' then
        --Import your additem function
    end
end

if Config.useItem then
    if Config.framework == 'qbcore' then
        QBCore.Functions.CreateUseableItem(Config.itemName, function(source)
            local src = source
            CreateSpeaker(src)
        end)
    elseif Config.framework == 'esx' then
        if ESX then
            ESX.RegisterUsableItem(Config.itemName, function(playerId)
                local src = playerId
                CreateSpeaker(src)
            end)
        else
            print('You need to import ESX  in fxmanifest')
        end
    elseif Config.framework == 'custom' then
        --Import your usableItem function
    end
else
    RegisterCommand('createSpeaker', function(source)
        local src = source
        CreateSpeaker(src)
    end)
end