local M = {}

function M.create(spec)
  spec = type(spec) == "table" and spec or {}
  local choices = type(spec.choices) == "table" and spec.choices or {}
  if #choices == 0 then return end

  return UI.CardNameBox {
    choices = choices,
    all_choices = spec.all_choices or choices,
    default = spec.default,
  }
end

return M
