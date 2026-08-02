$files = Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts,*.css
foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName)
    $c = $c -replace '\[#(151515|1A1A20|111111|0D0D0D|0B0B0E|050505|0D0020|231F32|262626|2A2A2A|1E1E1E|333)\]', 'black'
    $c = $c -replace 'text-\[#(86868B|BDBDBD|444|555|666|888)\]', 'text-white'
    $c = $c -replace '\[#(86868B|BDBDBD|444|555|666|888)\]', 'white'
    $c = $c -replace '\[#(9333EA|7E22CE)\]', '[#6811C9]'
    $c = $c -replace '\[#(25D366|d5e32d|EFFD32)\]', '[#E0F347]'
    $c = $c -replace 'rgba\(\s*147\s*,\s*51\s*,\s*234', 'rgba(104, 17, 201'
    $c = $c -replace 'rgba\(\s*239\s*,\s*253\s*,\s*50', 'rgba(224, 243, 71'
    [System.IO.File]::WriteAllText($file.FullName, $c)
}
