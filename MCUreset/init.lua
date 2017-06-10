local wifimodule = require 'wifimodule'
local socketmodule = require 'socketmodule'
local config = require 'config'

function init()

  local ws = socketmodule.initSocket()

end

wifimodule.connect(init)
