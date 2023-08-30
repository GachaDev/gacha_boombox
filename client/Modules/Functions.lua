Cbs = {}

RegisterNetEvent('TriggerCallback', function(name, ...)
    if Cbs[name] then
        Cbs[name](...)
        Cbs[name] = nil
    end
end)

function TriggerCallback(name, cb, ...)
    Cbs[name] = cb
    TriggerServerEvent('TriggerCallback', name, ...)
end