// Einheitliches Rezeptformat für manuelle Rezepte und einen späteren KI-/Fotoimport.
// Alle Mengen werden in der App auf die gespeicherte Zielportion bezogen.
const RECIPE_SCHEMA_VERSION=1;

function normalizeRecipe(input={}){
  return {
    schemaVersion:RECIPE_SCHEMA_VERSION,
    title:String(input.title||'').trim(),
    servings:Number(input.servings)||2,
    ingredients:Array.isArray(input.ingredients)?input.ingredients.map(x=>typeof x==='string'?x:{name:String(x.name||'').trim(),qty:Number(x.qty)||0,unit:String(x.unit||'').trim()}):[],
    instructions:Array.isArray(input.instructions)?input.instructions.map(x=>String(x).trim()).filter(Boolean):[],
    source:input.source||'manual',
    sourceMeta:input.sourceMeta||null
  };
}

function recipeFromImport(imported){
  // Späterer Einstiegspunkt für Kamera/KI: Die Auswertung muss nur dieses Format liefern.
  return normalizeRecipe({...imported,source:imported?.source||'photo-import'});
}
