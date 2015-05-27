var fs = require('fs');
var path = require('path');

var out = {};

var _typeface_js = {};
_typeface_js.loadFace = function(str){
    var font = str;
    var result = {};
   result.glyphs = {};
   result.cssFontStyle = font.cssFontStyle;
   result.familyName = font.familyName;
   result.ascender = font.ascender;
   result.descender = font.descender;
   result.underlinePosition = font.underlinePosition;
   result.underlineThickness = font.underlineThickness;
   result.boundingBox = {
       "yMin": font.boundingBox.yMin,
       "xMin": font.boundingBox.xMin,
       "yMax": font.boundingBox.yMax,
       "xMax": font.boundingBox.xMax
   };
   result.resolution = font.resolution;
   result.original_font_information = font.original_font_information;
   result.cssFontWeight = font.cssFontWeight;

   // for(var i=0; i<list.length; i++){
   for(var key in list){
       result.glyphs[ key ] = font.glyphs[ key ];
   }
   out = result;
}

var in_file = process.argv[2] || 'WenQuanYi Micro Hei_Regular.js';

var text = process.argv[4] ||'cs8425@gmail.com';
text = text.split('');
var list = {};
for(var i=0; i<text.length; i++){
    list[ text[i] ] = '';
}

var out_file = process.argv[3] || path.parse(in_file).base + '_trim.js';

console.log('in', in_file);
console.log('out', out_file);
console.log('text', list);

var raw = fs.readFileSync(in_file);
// var raw = fs.readFileSync('helvetiker_regular.typeface.js');
eval(raw.toString());
var result = "if (_typeface_js && _typeface_js.loadFace) _typeface_js.loadFace("+ JSON.stringify(out) + ");";

console.log('familyName:', out.familyName);
console.log('cssFontStyle:', out.cssFontStyle);
console.log('cssFontWeight:', out.cssFontWeight);
console.log('original_font_information:', out.original_font_information);

fs.writeFile(out_file, result, function (err) {
    if (err) throw err;
    console.log('font saved!');
});
