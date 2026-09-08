UI.TianzongCardNameBox = require("packages.tianzong.pkg.card_name_ui").create

local tianzong_niwo = require "packages/tianzong/pkg/tianzong_niwo"
local tianzong_chixue = require "packages/tianzong/pkg/tianzong_chixue"
local tianzong_cards = require "packages/tianzong/pkg/tianzong_cards"
local tianzong_toaru = require "packages/tianzong/pkg/tianzong_toaru"

require "packages/tianzong/pkg/runtime_translations"

return {  
  tianzong_niwo,
  tianzong_chixue,
  tianzong_cards,
  tianzong_toaru,
}
