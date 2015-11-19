var rom;

function rom_init(callBack)
{
	rom = {};

	rom.file = "_assets/_data/data.json";
	rom.store = null;
	rom.complete = rom_complete;
	rom.callBack = callBack;

	rom_json(rom);
}

function rom_json(obj)
{
	var json_req = new XMLHttpRequest();
	var json_met = "GET";
	var json_url = obj.file;
	var json_async = true;

	json_req.open(json_met, json_url, json_async);

	json_req.onload = function()
	{
		obj.store = JSON.parse(this.responseText);
		obj.complete(obj);
	}

	json_req.send();
}

function rom_complete(obj)
{
	trace(obj);
	rom.callBack();
}