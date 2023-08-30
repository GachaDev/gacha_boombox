Cbs = {}

RegisterNetEvent('TriggerCallback', function(name, ...)
    local src = source
    TriggerCallback(name, src, function(...)
        TriggerClientEvent('TriggerCallback', src, name, ...)
    end, ...)
end)

function CreateCallback(name, cb)
    Cbs[name] = cb
end

function TriggerCallback(name, source, cb, ...)
    if not Cbs[name] then return end
    Cbs[name](source, cb, ...)
end