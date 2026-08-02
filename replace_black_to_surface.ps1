$files = Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts
foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName)
    $c = $c -replace '\bbg-black\b', 'bg-surface'
    $c = $c -replace '\bbg-black/([0-9]+)\b', 'bg-surface/$1'
    $c = $c -replace '\bborder-black\b', 'border-border'
    [System.IO.File]::WriteAllText($file.FullName, $c)
}
