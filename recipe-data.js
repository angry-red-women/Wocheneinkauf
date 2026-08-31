// Zusätzliche von Marcel übermittelte Rezepte. Wird beim Laden und nach Cloud-Sync eingemischt,
// ohne bestehende oder selbst bearbeitete Rezepte zu überschreiben.
const suppliedRecipes={
  'Spargel-Kartoffelsalat mit wachsweichen Eiern':normalizeRecipe({
    title:'Spargel-Kartoffelsalat mit wachsweichen Eiern',
    servings:2,
    source:'chat-photo',
    ingredients:[
      '1 EL Senf',
      '1 EL heller Essig, z.B. Apfelessig',
      '0.5 EL flüssiger Honig',
      '0.125 Bund Schnittlauch, geschnitten',
      'Salz',
      'Pfeffer',
      '150 g Frühkartoffeln',
      '200 g grüne Spargeln',
      '2–4 Eier',
      '0.5 Bund Radiesli'
    ],
    instructions:[
      'Senf bis und mit Schnittlauch verrühren, Sauce würzen.',
      'Kartoffeln in Salzwasser knapp weich garen. Spargeln die letzten ca. 3 Minuten mitkochen. Abgiessen und auskühlen lassen.',
      'Eier 7 Minuten kochen, kalt abschrecken, schälen und halbieren.',
      'Kartoffeln und Spargeln mit der Salatsauce mischen, auf Tellern anrichten. Eier und Radiesli darauf verteilen.'
    ]
  })
};

function mergeSuppliedRecipes(){
  state.recipes=state.recipes||{};
  Object.entries(suppliedRecipes).forEach(([name,recipe])=>{
    if(!state.recipes[name])state.recipes[name]=recipe;
  });
}

const baseMigrate=migrate;
migrate=function(){baseMigrate();mergeSuppliedRecipes();};
mergeSuppliedRecipes();
localSave();
