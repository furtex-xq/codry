const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = { window: {}, console };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/runners.js'), 'utf8'), ctx);
const R = ctx.window.CodryRun;
const code = `
local coins: number = 0
local part = Instance.new("Part")
part.Name = "Coin"
part.Anchored = true
part.Parent = workspace
print("Part:", part.Name, part.Parent.Name, part.Size)
part.Touched:Connect(function(hit)
  coins += 10
  print(\`Touched by {hit.Name}! Coins: {coins}\`)
end)
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(player)
  local ls = Instance.new("Folder")
  ls.Name = "leaderstats"
  ls.Parent = player
  local c = Instance.new("IntValue", ls)
  c.Name = "Coins"
  print(player.Name .. " joined, coins = " .. player.leaderstats.Coins.Value)
end)
local p = Simulator.addPlayer("Alex")
Simulator.touch(part, p.Character.Head)
for i = 1, 5 do
  if i % 2 == 0 then continue end
  print(i)
end
local function add(a: number, b: number): number return a + b end
print(add(2, 3), typeof(Vector3.new(1,2,3)), Vector3.new(1,2,3) + Vector3.new(1,1,1))
print(#workspace:GetChildren(), math.clamp(15, 0, 10))
`;
// continue requires label; shim converts to goto continue — needs ::continue:: before end. Test as-is.
const src = R.luauProgram(code);
fetch('https://wandbox.org/api/compile.json', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ compiler: 'lua-5.4.7', code: src }) })
  .then(r => r.json()).then(j => console.log(j.program_output, j.program_error, j.compiler_error));
