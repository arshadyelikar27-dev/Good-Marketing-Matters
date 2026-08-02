$files = Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts
foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName)
    $newC = $c -replace 'viewport=\{\{\s*once:\s*true[^}]*\}\}', 'viewport={{ once: false, amount: 0.15 }}'
    if ($c -cne $newC) {
        [System.IO.File]::WriteAllText($file.FullName, $newC)
        Write-Host "Updated $($file.FullName)"
    }
}
