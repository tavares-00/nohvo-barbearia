from PIL import Image
from pathlib import Path
sources = {
 'fachada': Path('C:/Users/arthu/Downloads/nohvo_fachada.png'),
 'logo': Path('C:/Users/arthu/Downloads/nohvo_logo.png'),
 'parede': Path('C:/Users/arthu/Downloads/nohvo_parede.png'),
 'placa': Path('C:/Users/arthu/Downloads/nohvo_placa.png'),
 'marca': Path('C:/Users/arthu/AppData/Local/Temp/codex-clipboard-775606ed-bc46-4c34-b95b-8d348c472714.png')
}
for name, source in sources.items():
 im = Image.open(source).convert('RGB')
 im.save(Path('assets/images') / (name + '.webp'), 'WEBP', quality=88, method=6)
 print(name, im.size, (Path('assets/images') / (name+'.webp')).stat().st_size)
