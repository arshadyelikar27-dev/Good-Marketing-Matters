$files = Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts
foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName)
    
    # Carefully replace text-primary but NOT text-primary-foreground
    $c = $c -replace '\btext-primary(?!\-foreground)\b', 'text-accent'
    
    # Replace gray/slate text with white
    $c = $c -replace '\btext-(gray|slate|zinc)-\d+\b', 'text-white'
    
    # Replace other text vars with white
    $c = $c -replace '\btext-muted-foreground\b', 'text-white'
    $c = $c -replace '\btext-heading\b', 'text-white'
    $c = $c -replace '\btext-body-text\b', 'text-white'

    [System.IO.File]::WriteAllText($file.FullName, $c)
}
