local socketmodule = require 'socketmodule'
local wifimodule = require 'wifimodule'
local config = require 'config'

function init()

  print('init')
  print(wifi.sta.getip())

  local ws = socketmodule.start()

  ws:on('connection', function(ws)
    print('Websocket has Connected!')
  end)

  ws:on('close', function(_, status)
    print('Websocket closed the connection', status)
    ws = nil
  end)

  function onChange() 
    ws:send('Box ID: ' .. node.chipid())
  end

  print(gpio)
  print(gpio.read(1))

  gpio.mode(1, gpio.INT, gpio.PULLUP)
  gpio.trig(1, 'both', onChange)
  
  print(ws)

end

wifimodule.connect(config, init)
