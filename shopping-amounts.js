// Praktische Kaufmengen für die Einkaufsliste.
// Rezeptmengen selbst bleiben unverändert und exakt auf 2 Personen gerechnet.
function shoppingQty(item){
  if(!item || !item.qty) return item;
  const unit=normUnit(item.unit);
  const wholeUnits=['stk','dose','packung','becher','scheibe','zehe'];
  if(wholeUnits.includes(unit)) return {...item,qty:Math.ceil(item.qty)};
  return item;
}

// Die bestehende Synchronisierung wird erweitert: erst gleiche Rezeptzutaten summieren,
// danach nur die tatsächliche Kaufmenge bei Stückware auf ganze Einheiten runden.
function syncMenuIngredientsPractical(doSave=true){
  state.extra=state.extra.filter(x=>x.source!=='menu');
  const grouped=new Map();
  Object.values(state.menu).forEach(mealName=>{
    mealIngredientsFor(mealName).forEach(raw=>{
      const i=parseIng(raw),key=i.name.toLowerCase(),unit=normUnit(i.unit),gkey=key+'|'+unit;
      if(!key)return;
      if(i.qty&&grouped.has(gkey))grouped.get(gkey).qty+=i.qty;
      else if(!grouped.has(gkey))grouped.set(gkey,{name:i.name,qty:i.qty,unit:i.unit});
    });
  });
  grouped.forEach((raw,k)=>{
    const i=shoppingQty(raw);
    state.extra.push({id:'m_'+k.replace(/[^a-z0-9äöü]+/gi,'_'),name:i.name,qty:i.qty,unit:i.unit,cat:catFor(i.name),source:'menu'});
  });
  if(doSave)save();
}

syncMenuIngredients=syncMenuIngredientsPractical;
syncMenuIngredients(false);
