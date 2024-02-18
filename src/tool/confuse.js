const codes = ["1f600","1f601","1f602","1f923","1f603","1f604","1f605","1f606","1f609","1f60a","1f60b","1f60e","1f60d","1f618","1f617","1f619","1f61a","1f642","1f917","1f929","1f914","1f928","1f610","1f611","1f636","1f644","1f60f","1f623","1f625","1f62e","1f910","1f62f","1f62a","1f62b","1f634","1f60c","1f61b","1f61c","1f61d","1f924","1f612","1f613","1f614","1f615","1f643","1f911","1f632","1f641","1f616","1f61e","1f61f","1f624","1f622","1f62d","1f626","1f627","1f628","1f629","1f92f","1f62c","1f630","1f631","1f633","1f92a","1f635","1f621","1f620","1f92c","1f637","1f912","1f915","1f922","1f927","1f607","1f920","1f921","1f925","1f92b","1f92d","1f9d0","1f913","1f608","1f47f","1f479","1f47a","1f480","1f47b","1f47d","1f47e","1f916","1f4a9","1f63a","1f638","1f639","1f63b","1f63c","1f63d","1f640","1f63f","1f63e","1f648","1f649","1f64a","1f385","1f936","1f442","1f443","1f463","1f440","1f441","1f9e0","1f445","1f444","1f48b","1f498","1f493","1f494","1f495","1f496","1f497","1f499","1f49a","1f49b","1f9e1","1f49c","1f5a4","1f49d","1f49e","1f49f","1f48c","1f4a4","1f4a2","1f4a3","1f4a5","1f4a6","1f4a8","1f4ab","1f4ac","1f5e8","1f5ef","1f4ad","1f573","1f383","1f384","1f386","1f387","1f388","1f389","1f38a","1f38b","1f38d","1f38e","1f38f","1f390","1f391","1f380","1f381","1f397","1f39f","1f3ab","1f396","1f3c6","1f3c5","1f947","1f948","1f949","1f3e7","1f6ae","1f6b0","1f6b9","1f6ba","1f6bb","1f6bc","1f6be","1f6c2","1f6c3","1f6c4","1f6c5","1f6b8","1f6ab","1f6b3","1f6ad","1f6af","1f6b1","1f6b7","1f4f5","1f51e","1f503","1f504","1f519","1f51a","1f51b","1f51c","1f51d","1f6d0","1f549","1f54e","1f52f","1f500","1f501","1f502","1f53c","1f53d","1f3a6","1f505","1f506","1f4f6","1f4f3","1f4f4","1f531","1f4db","1f530","1f51f","1f4af","1f520","1f521","1f522","1f523","1f524","1f170","1f18e","1f171","1f191","1f192","1f193","1f194","1f195","1f196","1f17e","1f197","1f17f","1f198","1f199","1f19a","1f201","1f202","1f237","1f236","1f22f","1f250","1f239","1f21a","1f232","1f251","1f238","1f234","1f233","1f23a","1f235","1f536","1f537","1f538","1f539","1f53a","1f53b","1f4a0","1f518","1f532","1f533","1f534","1f535","1f1e6","1f1e7","1f1e8","1f1e9","1f1ea","1f1eb","1f1ec","1f1ed","1f1ee","1f1ef","1f1f0","1f1f1","1f1f2","1f1f3","1f1f4","1f1f5","1f1f6","1f1f7","1f1f8","1f1f9","1f1fa","1f1fb","1f1fc","1f1fd","1f1fe","1f1ff","1f4f1","1f4f2","1f4de","1f4df","1f4e0","1f50b","1f50c","1f4bb","1f5a5","1f5a8","1f5b1","1f5b2","1f4bd","1f4be","1f4bf","1f4c0","1f3a5","1f39e","1f4fd","1f3ac","1f4fa","1f4f7","1f4f8","1f4f9","1f4fc","1f50d","1f50e","1f56f","1f4a1","1f526","1f3ee","1f4d4","1f4d5","1f4d6","1f4d7","1f4d8","1f4d9","1f4da","1f4d3","1f4d2","1f4c3","1f4dc","1f4c4","1f4f0","1f5de","1f4d1","1f516","1f3f7","1f4b0","1f4b4","1f4b5","1f4b6","1f4b7","1f4b8","1f4b3","1f4b9","1f4b1","1f4b2","1f4e7","1f4e8","1f4e9","1f4e4","1f4e5","1f4e6","1f4eb","1f4ea","1f4ec","1f4ed","1f4ee","1f5f3","1f58b","1f58a","1f58c","1f58d","1f4dd","1f4bc","1f4c1","1f4c2","1f5c2","1f4c5","1f4c6","1f5d2","1f5d3","1f4c7","1f4c8","1f4c9","1f4ca","1f4cb","1f4cc","1f4cd","1f4ce","1f587","1f4cf","1f4d0","1f5c3","1f5c4","1f5d1","1f512","1f513","1f50f","1f510","1f511","1f5dd","1f528","1f6e0","1f5e1","1f52b","1f3f9","1f6e1","1f527","1f529","1f5dc","1f517","1f52c","1f52d","1f4e1","1f489","1f48a","1f6aa","1f6cf","1f6cb","1f6bd","1f6bf","1f6c1","1f6d2","1f6ac","1f5ff","1f3c1","1f6a9","1f38c","1f3f4","1f3f3","1f3c0","1f3d0","1f3c8","1f3c9","1f3be","1f3b3","1f3cf","1f3d1","1f3d2","1f3d3","1f3f8","1f94a","1f94b","1f945","1f3a3","1f3bd","1f3bf","1f6f7","1f94c","1f3af","1f3b1","1f52e","1f3ae","1f579","1f3b0","1f3b2","1f0cf","1f004","1f3b4","1f3ad","1f5bc","1f3a8","1f507","1f508","1f509","1f50a","1f4e2","1f4e3","1f4ef","1f514","1f515","1f3bc","1f3b5","1f3b6","1f399","1f39a","1f39b","1f3a4","1f3a7","1f4fb","1f3b7","1f3b8","1f3b9","1f3ba","1f3bb","1f941","1f6ce","1f570","1f55b","1f567","1f550","1f55c","1f551","1f55d","1f552","1f55e","1f553","1f55f","1f554","1f560","1f555","1f561","1f556","1f562","1f557","1f563","1f558","1f564","1f559","1f565","1f55a","1f566","1f311","1f312","1f313","1f314","1f315","1f316","1f317","1f318","1f319","1f31a","1f31b","1f31c","1f321","1f31d","1f31e","1f31f","1f320","1f324","1f325","1f326","1f327","1f328","1f329","1f32a","1f32b","1f32c","1f300","1f308","1f302","1f525","1f4a7","1f30a","1f453","1f576","1f454","1f455","1f456","1f9e3","1f9e4","1f9e5","1f9e6","1f457","1f458","1f459","1f45a","1f45b","1f45c","1f45d","1f6cd","1f392","1f45e","1f45f","1f460","1f461","1f462","1f451","1f452","1f3a9","1f393","1f9e2","1f4ff","1f484","1f48d","1f48e","1f35e","1f950","1f956","1f968","1f95e","1f9c0","1f356","1f357","1f969","1f953","1f354","1f35f","1f355","1f32d","1f96a","1f32e","1f32f","1f959","1f95a","1f373","1f958","1f372","1f963","1f957","1f37f","1f96b","1f371","1f358","1f359","1f35a","1f35b","1f35c","1f35d","1f360","1f362","1f363","1f364","1f365","1f361","1f95f","1f960","1f961","1f366","1f367","1f368","1f369","1f36a","1f382","1f370","1f967","1f36b","1f36c","1f36d","1f36e","1f36f","1f37c","1f95b","1f375","1f376","1f37e","1f377","1f378","1f379","1f37a","1f37b","1f942","1f943","1f964","1f962","1f37d","1f374","1f944","1f52a","1f3fa","1f682","1f683","1f684","1f685","1f686","1f687","1f688","1f689","1f68a","1f69d","1f69e","1f68b","1f68c","1f68d","1f68e","1f690","1f691","1f692","1f693","1f694","1f695","1f696","1f697","1f698","1f699","1f69a","1f69b","1f69c","1f6b2","1f6f4","1f6f5","1f68f","1f6e3","1f6e4","1f6e2","1f6a8","1f6a5","1f6a6","1f6d1","1f6a7","1f6f6","1f6a4","1f6f3","1f6e5","1f6a2","1f6e9","1f6eb","1f6ec","1f4ba","1f681","1f69f","1f6a0","1f6a1","1f6f0","1f680","1f6f8","1f435","1f412","1f98d","1f436","1f415","1f429","1f43a","1f98a","1f431","1f408","1f981","1f42f","1f405","1f406","1f434","1f40e","1f984","1f993","1f98c","1f42e","1f402","1f403","1f404","1f437","1f416","1f417","1f43d","1f40f","1f411","1f410","1f42a","1f42b","1f992","1f418","1f98f","1f42d","1f401","1f400","1f439","1f430","1f407","1f43f","1f994","1f987","1f43b","1f428","1f43c","1f43e","1f983","1f414","1f413","1f423","1f424","1f425","1f426","1f427","1f54a","1f985","1f986","1f989","1f438","1f40a","1f422","1f98e","1f40d","1f432","1f409","1f995","1f996","1f433","1f40b","1f42c","1f41f","1f420","1f421","1f988","1f419","1f41a","1f980","1f990","1f991","1f40c","1f98b","1f41b","1f41c","1f41d","1f41e","1f997","1f577","1f578","1f982","1f490","1f338","1f4ae","1f3f5","1f339","1f940","1f33a","1f33b","1f33c","1f337","1f331","1f332","1f333","1f334","1f335","1f33e","1f33f","1f340","1f341","1f342","1f343","1f347","1f348","1f349","1f34a","1f34b","1f34c","1f34d","1f34e","1f34f","1f350","1f351","1f352","1f353","1f95d","1f345","1f965","1f951","1f346","1f954","1f955","1f33d","1f336","1f952","1f966","1f344","1f95c","1f330","1f933","1f4aa","1f448","1f449","1f446","1f595","1f447","1f91e","1f596","1f918","1f919","1f590","1f44c","1f44d","1f44e","1f44a","1f91b","1f91c","1f91a","1f44b","1f91f","1f44f","1f450","1f64c","1f932","1f64f","1f91d","1f485","1f30d","1f30e","1f30f","1f310","1f5fa","1f5fe","1f3d4","1f30b","1f5fb","1f3d5","1f3d6","1f3dc","1f3dd","1f3de","1f3df","1f3db","1f3d7","1f3d8","1f3da","1f3e0","1f3e1","1f3e2","1f3e3","1f3e4","1f3e5","1f3e6","1f3e8","1f3e9","1f3ea","1f3eb","1f3ec","1f3ed","1f3ef","1f3f0","1f492","1f5fc","1f5fd","1f54c","1f54d","1f54b","1f301","1f303","1f3d9","1f304","1f305","1f306","1f307","1f309","1f30c","1f3a0","1f3a1","1f3a2","1f488","1f3aa","1f93a","1f3c7","1f3c2","1f3cc","1f3c4","1f6a3","1f3ca","1f3cb","1f6b4","1f6b5","1f3ce","1f3cd","1f938","1f93c","1f93d","1f93e","1f600","1f601","1f602","1f923","1f603","1f604","1f605","1f606","1f609","1f60a","1f60b","1f60e","1f60d","1f618","1f617","1f619","1f61a","1f642","1f917","1f929","1f914","1f928","1f610","1f611","1f636","1f644","1f60f","1f623","1f625","1f62e","1f910","1f62f","1f62a","1f62b","1f634","1f60c","1f61b","1f61c","1f61d","1f924","1f612","1f613","1f614","1f615","1f643","1f911","1f632","1f641","1f616","1f61e","1f61f","1f624","1f622","1f62d","1f626","1f627","1f628","1f629","1f92f","1f62c","1f630","1f631","1f633","1f92a","1f635","1f621","1f620","1f92c","1f637","1f912","1f915","1f922","1f92e","1f927","1f607","1f920","1f921","1f925","1f92b","1f92d","1f9d0","1f913","1f608","1f47f","1f479","1f47a","1f480","1f47b","1f47d","1f47e","1f916","1f4a9","1f63a","1f638","1f639","1f63b","1f63c","1f63d","1f640","1f63f","1f63e","1f648","1f649","1f64a","1f3fb","1f3fc","1f3fd","1f3fe","1f3ff","1f476","1f9d2","1f466","1f467","1f9d1","1f468","1f469","1f9d3","1f474","1f475","1f46e","1f575","1f482","1f477","1f934","1f478","1f473","1f472","1f9d5","1f9d4","1f471","1f935","1f470","1f930","1f931","1f47c","1f385","1f936","1f9d9","1f9da","1f9db","1f9dc","1f9dd","1f9de","1f9df","1f64d","1f64e","1f645","1f646","1f481","1f64b","1f647","1f926","1f937","1f486","1f487","1f6b6","1f3c3","1f483","1f57a","1f46f","1f9d6","1f9d7","1f9d8","1f6c0","1f6cc","1f574","1f5e3","1f464","1f465","1f939","1f46b","1f46c","1f46d","1f48f","1f491","1f46a","1f442","1f443","1f463","1f440","1f441","1f9e0","1f445","1f444","1f48b","1f498","1f493","1f494","1f495","1f496","1f497","1f499","1f49a","1f49b","1f9e1","1f49c","1f5a4","1f49d","1f49e","1f49f","1f48c","1f4a4","1f4a2","1f4a3","1f4a5","1f4a6","1f4a8","1f4ab","1f4ac","1f5e8","1f5ef","1f4ad","1f573","1f383","1f384","1f386","1f387","1f388","1f389","1f38a","1f38b","1f38d","1f38e","1f38f","1f390","1f391","1f380","1f381","1f397","1f39f","1f3ab","1f396","1f3c6","1f3c5","1f947","1f948","1f949"];
const name_re = /[A-Za-z_][A-Za-z0-9_]*/
const num_re = /[0-9]+\.?[0-9]*(e[0-9]+)?/;
const sym_re = /[!@#$%^&\*()_+=\-\[\]{}\|?.,;:<>]+/;
const str_re = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/;
const words = ['alignas','alignof','andb','and_eqb','asma','auto','bitandb','bitorb','bool','break','case','catch','char','char8_tc','char16_t','char32_t','class','complb','conceptc','const','const_cast','constevalc','constexpr','main','constinitc','continue','co_awaitc','co_returnc','co_yieldc','decltype','default','delete','do','double','dynamic_cast','else','enum','explicit','exportc','extern','false','float','for','friend','goto','if','inline','','int','long','mutable','namespace','new','noexcept','notb','not_eqb','nullptr','operator','orb','or_eqb','private','protected','public','register reinterpret_cast','requiresc','return','short','signed','sizeof','static','static_assert','','static_cast','struct','switch','template','this','thread_local','throw','true','try','typedef','typeid','typename','union','unsigned','using','virtual','void','volatile','wchar_t','while','xorb','xor_eqb'];
const res = [name_re,num_re,sym_re,str_re];
$("textarea").on("input",function(){
    let rc = 1 + ($(this).val().match(/\n/g) || []).length;
    $(this).attr("rows",Math.max(rc,5));
});
$("textarea").trigger("input");
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function find_func(){
	let lines = [].concat(...code.value.split("\n").filter(s=>!s.trim().startsWith("#")&&!s.trim().startsWith("//")).map(s=>s.split(";"))).map(s=>s.trim()).filter(s=>s);
	let tokens = [].concat(...lines.map(s=>s.replaceAll(")"," ) ").replaceAll("("," ( ").replaceAll("["," [ ").replaceAll("]"," ] ").replaceAll("{"," { ").replaceAll("}"," } ").replaceAll(","," , ").split(" ")));
	let found = [";","()"];
	for(let token of tokens){
		let i = 0;
		while(i<token.length){
			let ok = false;
			for(let re of res){
				let o = re.exec(token.substr(i));
				if (o&&o.index==0){
					i += o[0].length;
					if(!found.includes(o[0])&&o[0].split("(").length==o[0].split(")").length) found.push(o[0]);
					ok = true;
					break;
				}
			}
			if(!ok) break;
		}
	}
	found.sort((a,b)=>b.length-a.length);
	return found;
}
function collect_func(){
	let lines = code.value.split("\n").filter(s=>!s.trim().startsWith("#")&&!s.trim().startsWith("//")).map(s=>s.trim()).filter(s=>s);
	let names = [].concat(...lines.filter(s=>s.includes(" ")).map(s=>s.split(" ")[1]).map(s=>[...s.split(",").map(s=>name_re.exec(s))])).filter(o=>o).map(o=>o[0]);
	let vars = [];
	let found = find_func();
	for(let s of names){
		if(!vars.includes(s)&&!words.includes(s)&&found.includes(s))vars.push(s);
	}
	collected.value = vars.join("\n");
	$(collected).trigger("input");
}
collect.onclick = collect_func;

function run_func(){
	let found = find_func();
	let mp = {};
	let vars = collected.value.split("\n").filter(s=>s);
	let cur_codes = codes.slice(0,found.length);
	shuffle(cur_codes);
	for (let i in found) mp[found[i]] = cur_codes[i];
	let content = code.value.split("\n").filter(s=>!s.trim().startsWith("#")&&!s.trim().startsWith("//")).join("\n");
	let defs = [];
	for(let k of found) {
		content = content.replaceAll(k," "+String.fromCodePoint(Number("0x"+mp[k]))+" ");
		if (!vars.includes(k)){
			defs.push("#define \\U000"+mp[k]+" "+k);
		}
	}
	content = content.replaceAll("  "," ");
	shuffle(defs);
	content = [].concat(code.value.split("\n").filter(s=>s.trim().startsWith("#")),defs,content.split(/\s/g).join(" ")).join("\n");
	while(content.includes("  ")) content = content.replaceAll("  "," ");
	code_out.value = content;
	$(collected).trigger("input");
}
run.onclick = run_func;