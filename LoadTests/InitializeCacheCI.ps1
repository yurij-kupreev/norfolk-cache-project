$hosturl = "https://norfolk-cache-ci.azurewebsites.net"

$data = Import-Csv "LoadTests/KeyValueCI.csv"

ForEach ($kv in $data) {
	$namespace = $($kv.Namespace)
	$key = $($kv.Key)
	$value = $($kv.Value)
	
	$postParams = @{username=''}
	Invoke-WebRequest -UseBasicParsing $hosturl/api/cache/namespaces/$namespace/$key/$value -ContentType "application/json" -Method POST -Body $PostParams
}
