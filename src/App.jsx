import { useState, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --tomato:#C8392B;--tomato-l:#E04535;--tomato-d:#9B2C20;
    --beige:#F7F0E6;--beige-d:#EDE3D4;--beige-dd:#D9CCBA;
    --ink:#2B1F1A;--muted:#8A7060;--white:#FFFDF9;
    --green:#3A7D44;--green-l:#EBF5EC;
    --yellow:#D4960A;--yellow-l:#FEF6E4;
    --blue:#2563A8;--blue-l:#EBF2FB;
  }
  body{font-family:'Nunito',sans-serif;background:var(--beige);color:var(--ink);min-height:100vh;}
  .app{max-width:430px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;background:var(--beige);}

  /* HEADER */
  .header{background:var(--tomato);padding:18px 20px 14px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(200,57,43,0.3);}
  .header-row{display:flex;align-items:center;justify-content:space-between;}
  .logo{font-family:'Libre Baskerville',serif;font-size:30px;font-weight:700;color:var(--white);}
  .slogan{font-size:11px;color:rgba(255,253,249,0.72);font-style:italic;font-family:'Libre Baskerville',serif;margin-top:3px;}
  .hbadges{display:flex;gap:6px;}
  .hbadge{background:rgba(255,253,249,0.2);color:var(--white);font-size:11px;font-weight:700;padding:5px 11px;border-radius:20px;cursor:pointer;border:none;transition:background 0.2s;font-family:'Nunito',sans-serif;}
  .hbadge:hover{background:rgba(255,253,249,0.3);}
  .hbadge.lit{background:var(--yellow-l);color:var(--yellow);}

  /* TABS */
  .tabs{display:flex;background:var(--beige-d);border-bottom:2px solid var(--beige-dd);}
  .tab{flex:1;padding:9px 2px 7px;border:none;background:transparent;font-family:'Nunito',sans-serif;font-size:9.5px;font-weight:700;color:var(--muted);cursor:pointer;transition:all 0.18s;display:flex;flex-direction:column;align-items:center;gap:2px;letter-spacing:0.3px;text-transform:uppercase;position:relative;}
  .tab.active{color:var(--tomato);background:var(--beige);}
  .tab.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:var(--tomato);}
  .tab-icon{font-size:15px;}
  .tab-pip{position:absolute;top:5px;right:6px;background:var(--tomato);color:white;font-size:8px;font-weight:700;width:13px;height:13px;border-radius:50%;display:flex;align-items:center;justify-content:center;}

  /* CONTENT */
  .content{flex:1;padding:18px 16px 100px;overflow-y:auto;}
  .sec-title{font-family:'Libre Baskerville',serif;font-size:22px;color:var(--ink);margin-bottom:2px;}
  .sec-sub{font-size:12px;color:var(--muted);margin-bottom:18px;}
  .divider{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin:4px 0 12px;display:flex;align-items:center;gap:8px;}
  .divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--beige-dd);}

  /* MOOD */
  .mood-row{display:flex;gap:8px;margin-bottom:18px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;}
  .mood-btn{flex-shrink:0;padding:8px 18px;border-radius:24px;border:2px solid var(--beige-dd);background:var(--white);font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;color:var(--muted);cursor:pointer;transition:all 0.18s;white-space:nowrap;}
  .mood-btn.active{background:var(--tomato);border-color:var(--tomato);color:white;box-shadow:0 3px 10px rgba(200,57,43,0.28);}

  /* BUTTONS */
  .gen-btn{width:100%;padding:15px;background:var(--tomato);color:white;border:none;border-radius:14px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:18px;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(200,57,43,0.25);}
  .gen-btn:hover{background:var(--tomato-l);transform:translateY(-1px);}
  .gen-btn:disabled{background:var(--beige-dd);color:var(--muted);cursor:not-allowed;transform:none;box-shadow:none;}
  .outline-btn{width:100%;padding:13px;background:transparent;color:var(--tomato);border:2px solid var(--tomato);border-radius:14px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.18s;margin-bottom:8px;}
  .outline-btn:hover{background:var(--tomato);color:white;}

  /* MEAL CARD */
  .meal-card{background:var(--white);border-radius:16px;overflow:hidden;margin-bottom:12px;box-shadow:0 2px 10px rgba(43,31,26,0.07);cursor:pointer;transition:transform 0.18s,box-shadow 0.18s;animation:fadeUp 0.35s ease both;border:1.5px solid transparent;}
  .meal-card:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(43,31,26,0.12);}
  .meal-card.fav{border-color:var(--yellow);}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
  .meal-top{display:flex;}
  .meal-emoji{width:80px;display:flex;align-items:center;justify-content:center;font-size:40px;flex-shrink:0;padding:14px 6px;}
  .meal-info{flex:1;padding:14px 14px 10px 4px;}
  .meal-name{font-family:'Libre Baskerville',serif;font-size:15px;font-weight:700;margin-bottom:4px;color:var(--ink);line-height:1.3;}
  .meal-desc{font-size:12px;color:var(--muted);line-height:1.5;}
  .meal-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 14px 10px;border-top:1px solid var(--beige-d);background:var(--beige);}
  .tags{display:flex;gap:5px;flex-wrap:wrap;}
  .tag{font-size:10px;padding:3px 9px;border-radius:12px;font-weight:700;background:var(--beige-d);color:var(--muted);}
  .tag.r{background:#FDECEA;color:var(--tomato);}
  .tag.g{background:var(--green-l);color:var(--green);}
  .tag.b{background:var(--blue-l);color:var(--blue);}
  .actions{display:flex;gap:6px;}
  .ic-btn{width:30px;height:30px;border:none;border-radius:8px;background:var(--beige-d);color:var(--muted);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;}
  .ic-btn:hover{background:var(--beige-dd);}
  .ic-btn.yfav{background:var(--yellow-l);color:var(--yellow);}
  .ic-btn.gcart{background:var(--green-l);color:var(--green);}

  /* AD */
  .ad-strip{background:var(--beige-d);border-radius:14px;padding:12px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px;border:1.5px dashed var(--beige-dd);}
  .ad-micro{font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:2px;}
  .ad-text{font-family:'Libre Baskerville',serif;font-size:13px;color:var(--ink);}
  .ad-cta{margin-left:auto;background:var(--tomato);color:white;border:none;border-radius:8px;padding:7px 13px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;white-space:nowrap;}

  /* CHAT */
  .chat-wrap{display:flex;flex-direction:column;height:calc(100vh - 205px);}
  .msgs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding-bottom:8px;scrollbar-width:thin;scrollbar-color:var(--beige-dd) transparent;}
  .msg{max-width:88%;padding:11px 15px;border-radius:18px;font-size:13.5px;line-height:1.55;animation:fadeUp 0.25s ease;white-space:pre-wrap;}
  .msg.user{background:var(--tomato);color:white;align-self:flex-end;border-bottom-right-radius:4px;}
  .msg.chef{background:var(--white);color:var(--ink);align-self:flex-start;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(43,31,26,0.07);border:1px solid var(--beige-d);}
  .msg-who{font-size:10px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;margin-bottom:4px;opacity:0.6;}
  .chat-bar{display:flex;gap:8px;padding:12px 0 0;border-top:2px solid var(--beige-d);margin-top:8px;}
  .chat-in{flex:1;padding:11px 16px;border:2px solid var(--beige-dd);border-radius:24px;font-family:'Nunito',sans-serif;font-size:13px;color:var(--ink);background:var(--white);outline:none;transition:border-color 0.2s;}
  .chat-in:focus{border-color:var(--tomato);}
  .send-btn{width:44px;height:44px;background:var(--tomato);border:none;border-radius:50%;color:white;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.18s;flex-shrink:0;box-shadow:0 3px 10px rgba(200,57,43,0.28);}
  .send-btn:hover{background:var(--tomato-l);transform:scale(1.05);}
  .send-btn:disabled{background:var(--beige-dd);box-shadow:none;cursor:not-allowed;transform:none;}

  /* RECIPE */
  .recipe-hero{background:var(--tomato);border-radius:18px;padding:22px 20px;margin-bottom:14px;position:relative;overflow:hidden;}
  .recipe-hero::after{content:attr(data-emoji);position:absolute;right:14px;bottom:-6px;font-size:72px;opacity:0.2;line-height:1;}
  .rh-title{font-family:'Libre Baskerville',serif;font-size:22px;color:white;font-weight:700;margin-bottom:8px;line-height:1.2;}
  .r-meta{display:flex;gap:14px;}
  .r-meta span{font-size:12px;color:rgba(255,255,255,0.8);font-weight:600;}
  .r-block{background:var(--white);border-radius:16px;padding:18px;margin-bottom:12px;box-shadow:0 2px 8px rgba(43,31,26,0.06);}
  .rb-title{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--tomato);margin-bottom:12px;}
  .ing-list{list-style:none;display:flex;flex-direction:column;gap:7px;}
  .ing-item{font-size:13px;color:var(--ink);display:flex;align-items:center;gap:10px;}
  .ing-dot{width:7px;height:7px;border-radius:50%;background:var(--tomato);flex-shrink:0;}
  .steps-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .step-row{display:flex;gap:12px;align-items:flex-start;}
  .step-n{width:24px;height:24px;background:var(--tomato);color:white;border-radius:8px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
  .step-t{font-size:13px;color:var(--ink);line-height:1.6;}
  .r-acts{display:flex;gap:8px;margin-bottom:14px;}
  .r-act{flex:1;padding:12px;border-radius:12px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.18s;border:2px solid var(--beige-dd);background:var(--beige);color:var(--muted);}
  .r-act.yfav{background:var(--yellow-l);color:var(--yellow);border-color:var(--yellow-l);}
  .r-act.gcart{background:var(--green-l);color:var(--green);border-color:var(--green-l);}

  /* FRIDGE */
  .fridge-hero{background:linear-gradient(135deg,#1a3a5c,#2563A8);border-radius:18px;padding:20px;margin-bottom:18px;position:relative;overflow:hidden;}
  .fridge-hero::after{content:'🧊';position:absolute;right:16px;bottom:-4px;font-size:60px;opacity:0.18;line-height:1;}
  .fridge-hero-title{font-family:'Libre Baskerville',serif;font-size:20px;color:white;font-weight:700;margin-bottom:4px;}
  .fridge-hero-sub{font-size:12px;color:rgba(255,255,255,0.7);line-height:1.5;}

  .ing-input-row{display:flex;gap:8px;margin-bottom:12px;}
  .ing-input{flex:1;padding:11px 16px;border:2px solid var(--beige-dd);border-radius:24px;font-family:'Nunito',sans-serif;font-size:13px;color:var(--ink);background:var(--white);outline:none;transition:border-color 0.2s;}
  .ing-input:focus{border-color:var(--blue);}
  .add-ing-btn{width:42px;height:42px;background:var(--blue);border:none;border-radius:50%;color:white;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.18s;flex-shrink:0;}
  .add-ing-btn:hover{background:#1a4d8f;transform:scale(1.05);}
  .add-ing-btn:disabled{background:var(--beige-dd);cursor:not-allowed;transform:none;}

  .ing-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px;min-height:10px;}
  .ing-chip{display:flex;align-items:center;gap:6px;background:var(--blue-l);color:var(--blue);font-size:12px;font-weight:700;padding:6px 12px;border-radius:20px;animation:fadeUp 0.2s ease;}
  .chip-del{background:none;border:none;color:var(--blue);font-size:16px;cursor:pointer;padding:0;line-height:1;opacity:0.6;transition:opacity 0.15s;}
  .chip-del:hover{opacity:1;}

  .quick-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;}
  .quick-chip{padding:6px 13px;border-radius:20px;border:1.5px solid var(--beige-dd);background:var(--white);font-family:'Nunito',sans-serif;font-size:11px;font-weight:700;color:var(--muted);cursor:pointer;transition:all 0.15s;}
  .quick-chip:hover{border-color:var(--blue);color:var(--blue);}

  .fridge-gen-btn{width:100%;padding:15px;background:var(--blue);color:white;border:none;border-radius:14px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:18px;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(37,99,168,0.28);}
  .fridge-gen-btn:hover{background:#1a4d8f;transform:translateY(-1px);}
  .fridge-gen-btn:disabled{background:var(--beige-dd);color:var(--muted);cursor:not-allowed;transform:none;box-shadow:none;}

  .fridge-result-card{background:var(--white);border-radius:16px;padding:18px;margin-bottom:12px;box-shadow:0 2px 10px rgba(43,31,26,0.07);animation:fadeUp 0.35s ease both;border-left:4px solid var(--blue);}
  .frc-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:10px;}
  .frc-emoji{font-size:30px;flex-shrink:0;}
  .frc-name{font-family:'Libre Baskerville',serif;font-size:16px;font-weight:700;color:var(--ink);flex:1;}
  .frc-time{font-size:11px;font-weight:700;color:var(--blue);background:var(--blue-l);padding:3px 9px;border-radius:12px;white-space:nowrap;}
  .frc-desc{font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:10px;}
  .frc-missing{font-size:11px;color:var(--muted);background:var(--beige-d);padding:8px 12px;border-radius:10px;margin-bottom:10px;}
  .frc-missing strong{color:var(--tomato);}
  .frc-actions{display:flex;gap:8px;}
  .frc-btn{flex:1;padding:9px;border-radius:10px;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;cursor:pointer;border:none;transition:all 0.15s;}
  .frc-btn.primary{background:var(--blue);color:white;}
  .frc-btn.primary:hover{background:#1a4d8f;}
  .frc-btn.sec{background:var(--beige-d);color:var(--muted);}
  .frc-btn.sec:hover{background:var(--beige-dd);}

  /* FAVORITES */
  .empty-state{text-align:center;padding:50px 20px;color:var(--muted);}
  .empty-icon{font-size:52px;margin-bottom:14px;}
  .empty-title{font-family:'Libre Baskerville',serif;font-size:18px;color:var(--ink);margin-bottom:6px;}
  .empty-sub{font-size:13px;line-height:1.55;}

  /* SHOPPING */
  .shop-src{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin:16px 0 8px;}
  .shop-item{display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--white);border-radius:12px;margin-bottom:6px;box-shadow:0 1px 5px rgba(43,31,26,0.05);animation:fadeUp 0.25s ease;}
  .shop-item.done{opacity:0.45;}
  .chk{width:22px;height:22px;border-radius:6px;border:2px solid var(--beige-dd);background:transparent;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-size:12px;color:transparent;}
  .chk.on{background:var(--green);border-color:var(--green);color:white;}
  .shop-txt{flex:1;font-size:13px;color:var(--ink);}
  .shop-item.done .shop-txt{text-decoration:line-through;color:var(--muted);}
  .del-btn{background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;line-height:1;transition:color 0.15s;padding:0 2px;}
  .del-btn:hover{color:var(--tomato);}
  .clear-btn{width:100%;padding:12px;background:transparent;border:2px solid var(--beige-dd);border-radius:12px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;color:var(--muted);cursor:pointer;margin-top:8px;transition:all 0.15s;}
  .clear-btn:hover{border-color:var(--tomato);color:var(--tomato);}

  /* LOADING */
  .dots{display:flex;gap:4px;align-items:center;}
  .dots span{width:6px;height:6px;background:currentColor;border-radius:50%;animation:bk 0.9s infinite;}
  .dots span:nth-child(2){animation-delay:0.15s;}
  .dots span:nth-child(3){animation-delay:0.3s;}
  @keyframes bk{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}}
`;

const MEALS = {
  quick:[
    {id:1,emoji:"🍝",bg:"#FEF0E8",name:"Spaghetti Carbonara",desc:"Creamy, classic, done in 15 minutes flat.",tags:["15 min","Easy"],tc:["r",""],recipe:{time:"15 min",serves:"2",ingredients:["200g spaghetti","100g smoked bacon","2 egg yolks","50g parmesan, grated","Black pepper","Salt"],steps:["Boil spaghetti in salted water until al dente.","Fry bacon in a dry pan until crispy.","Whisk egg yolks with parmesan.","Drain pasta, save a cup of cooking water.","Off heat, toss pasta, bacon and egg mix.","Loosen with pasta water. Pepper generously."]}},
    {id:2,emoji:"🌮",bg:"#FFF9E8",name:"Quick Chicken Tacos",desc:"Juicy spiced chicken in warm tortillas.",tags:["20 min","Fun"],tc:["r",""],recipe:{time:"20 min",serves:"4",ingredients:["4 tortillas","300g chicken breast","Cumin, paprika, garlic powder","Sour cream","Lettuce & tomato","Cheddar"],steps:["Slice chicken and toss with spices.","Pan-fry on high heat 3 min each side.","Warm tortillas 30 sec in dry pan.","Fill with chicken, lettuce and tomato.","Top with sour cream and cheddar."]}},
    {id:3,emoji:"🥗",bg:"#EDF8EF",name:"Greek Salad Bowl",desc:"Crisp, fresh, zero cooking required.",tags:["10 min","Healthy"],tc:["","g"],recipe:{time:"10 min",serves:"2",ingredients:["1 cucumber","2 ripe tomatoes","100g feta","Kalamata olives","½ red onion","Olive oil, oregano, salt"],steps:["Chop cucumber, tomatoes and red onion.","Combine in a bowl with olives.","Crumble feta generously on top.","Drizzle with olive oil.","Season with oregano and flaky salt."]}},
  ],
  healthy:[
    {id:4,emoji:"🥦",bg:"#EDF8EF",name:"Green Veggie Curry",desc:"Warming coconut curry packed with goodness.",tags:["25 min","Vegan"],tc:["","g"],recipe:{time:"25 min",serves:"2",ingredients:["1 head broccoli","1 courgette","400ml coconut milk","2 tbsp red curry paste","Basmati rice","Fresh ginger"],steps:["Cook rice. Sauté ginger with curry paste.","Add chopped vegetables, stir 2 min.","Pour in coconut milk, simmer 15 min.","Taste and season. Serve over rice."]}},
    {id:5,emoji:"🐟",bg:"#EBF3FE",name:"Lemon Herb Salmon",desc:"Light, elegant, and full of omega-3.",tags:["18 min","Protein"],tc:["","g"],recipe:{time:"18 min",serves:"2",ingredients:["2 salmon fillets","1 lemon","Fresh dill","2 tbsp olive oil","Salt & pepper","200g green beans"],steps:["Preheat oven to 180°C / 350°F.","Place salmon on lined baking tray.","Drizzle olive oil and lemon juice.","Scatter dill, salt, pepper.","Bake 12–15 min. Serve with green beans."]}},
  ],
  comfort:[
    {id:6,emoji:"🍔",bg:"#FEF0E8",name:"Ultimate Smash Burger",desc:"Crispy edges, melty cheddar. Pure happiness.",tags:["30 min","Indulgent"],tc:["r",""],recipe:{time:"30 min",serves:"2",ingredients:["2×180g beef patties","2 brioche buns","2 cheddar slices","Caramelised onions","Burger sauce","Lettuce & tomato"],steps:["Caramelise onions in butter 15 min on low.","Mix sauce: mayo, ketchup, mustard, pickles.","Smash patties in a hot pan, 3 min each side.","Add cheddar, cover to melt.","Build: bun, sauce, lettuce, tomato, patty, onions."]}},
    {id:7,emoji:"🥘",bg:"#FFF8E8",name:"French Onion Soup",desc:"Deep, rich, topped with bubbling gruyère.",tags:["45 min","Cosy"],tc:["r",""],recipe:{time:"45 min",serves:"4",ingredients:["6 large onions, sliced","1L beef stock","150ml dry white wine","100g gruyère, grated","4 baguette slices","Butter, thyme, bay leaf"],steps:["Caramelise onions in butter 30 min.","Add wine, reduce 5 min.","Add stock, thyme, bay. Simmer 15 min.","Ladle into ovenproof bowls, top with baguette.","Pile on gruyère. Grill until bubbling."]}},
  ],
};

const MOODS=[{id:"quick",label:"⚡ Quick"},{id:"healthy",label:"🥗 Healthy"},{id:"comfort",label:"🍲 Comfort"}];

const QUICK_INGS=["Eggs","Pasta","Chicken","Rice","Onion","Garlic","Tomatoes","Cheese","Butter","Potatoes","Carrots","Lemon","Olive oil","Canned tuna","Bread"];

async function callChef(messages){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
      system:"You are Chef, a warm and encouraging culinary assistant. Help people cook with confidence and joy. Be friendly, practical, concise. Speak English only. Use emojis sparingly.",
      messages})});
  const d=await res.json();
  return d.content?.map(b=>b.text||"").join("")||"Something went wrong!";
}

export default function App(){
  const [tab,setTab]=useState("ideas");
  const [mood,setMood]=useState("quick");
  const [selected,setSelected]=useState(null);
  const [favs,setFavs]=useState([]);
  const [cart,setCart]=useState([]);
  const [msgs,setMsgs]=useState([{role:"chef",text:"Hey! I'm Chef 👨‍🍳 Ask me what to cook tonight, what to do with your leftovers, or anything kitchen-related!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [aiMeals,setAiMeals]=useState([]);
  const [genning,setGenning]=useState(false);

  // Fridge state
  const [fridgeIngs,setFridgeIngs]=useState([]);
  const [ingInput,setIngInput]=useState("");
  const [fridgeResults,setFridgeResults]=useState([]);
  const [fridgeLoading,setFridgeLoading]=useState(false);

  const endRef=useRef(null);

  const isFav=(id)=>favs.some(f=>f.id===id);
  const inCart=(id)=>cart.some(c=>c.mealId===id);
  const toggleFav=(meal,e)=>{e?.stopPropagation();setFavs(p=>isFav(meal.id)?p.filter(f=>f.id!==meal.id):[...p,meal]);};
  const addToCart=(meal,e)=>{e?.stopPropagation();if(inCart(meal.id))return;setCart(p=>[...p,...meal.recipe.ingredients.map((ing,i)=>({id:`${meal.id}-${i}`,text:ing,source:meal.name,mealId:meal.id,done:false}))]);};
  const openRecipe=(meal)=>{setSelected(meal);setTab("recipe");};

  const send=async()=>{
    if(!input.trim()||loading)return;
    const txt=input.trim();setInput("");
    setMsgs(p=>[...p,{role:"user",text:txt}]);
    setLoading(true);
    try{
      const hist=[...msgs,{role:"user",text:txt}].map(m=>({role:m.role==="chef"?"assistant":"user",content:m.text}));
      const r=await callChef(hist);
      setMsgs(p=>[...p,{role:"chef",text:r}]);
    }catch{setMsgs(p=>[...p,{role:"chef",text:"Oops! Something went wrong. Try again!"}]);}
    setLoading(false);
    setTimeout(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const generateAi=async()=>{
    setGenning(true);setAiMeals([]);
    try{
      const p=`Suggest 3 ${mood==="quick"?"quick under-20-min":mood==="healthy"?"healthy nutritious":"comforting hearty"} meal ideas. Reply ONLY valid JSON array, no backticks:\n[{"name":"Name","desc":"One sentence.","time":"X min","emoji":"🍽️","color":"#FFF3E8"}]`;
      const r=await callChef([{role:"user",content:p}]);
      setAiMeals(JSON.parse(r.replace(/```json|```/g,"").trim()));
    }catch{setAiMeals([{name:"Try again",desc:"The AI had a hiccup!",time:"-",emoji:"😅",color:"#F7F0E6"}]);}
    setGenning(false);
  };

  const addIng=()=>{
    const v=ingInput.trim();
    if(!v||fridgeIngs.includes(v))return;
    setFridgeIngs(p=>[...p,v]);
    setIngInput("");
  };

  const removeIng=(ing)=>setFridgeIngs(p=>p.filter(i=>i!==ing));

  const toggleQuickIng=(ing)=>{
    if(fridgeIngs.includes(ing)) removeIng(ing);
    else setFridgeIngs(p=>[...p,ing]);
  };

  const generateFridgeRecipes=async()=>{
    if(fridgeIngs.length===0)return;
    setFridgeLoading(true);setFridgeResults([]);
    try{
      const p=`I have these ingredients at home: ${fridgeIngs.join(", ")}.
Suggest 3 recipes I can make using mostly these ingredients. Some minor pantry staples (salt, oil, water) are always available.
Reply ONLY with a valid JSON array, no backticks, no extra text:
[{
  "name": "Recipe Name",
  "emoji": "🍽️",
  "time": "X min",
  "desc": "Short appetizing description.",
  "uses": ["ingredient1","ingredient2"],
  "missing": ["any extra ingredient needed if any, keep it short"],
  "steps": ["Step 1.","Step 2.","Step 3.","Step 4."]
}]`;
      const r=await callChef([{role:"user",content:p}]);
      setFridgeResults(JSON.parse(r.replace(/```json|```/g,"").trim()));
    }catch{setFridgeResults([{name:"Oops!",emoji:"😅",time:"-",desc:"Something went wrong. Try again!",uses:[],missing:[],steps:[]}]);}
    setFridgeLoading(false);
  };

  const meals=MEALS[mood]||[];
  const shopCount=cart.filter(c=>!c.done).length;
  const bySource=cart.reduce((a,i)=>{if(!a[i.source])a[i.source]=[];a[i.source].push(i);return a;},{});

  return(
    <>
      <style>{STYLES}</style>
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <div className="header-row">
            <div>
              <div className="logo">Chef.</div>
              <div className="slogan">Dinner sorted in seconds</div>
            </div>
            <div className="hbadges">
              <button className={`hbadge ${favs.length?"lit":""}`} onClick={()=>setTab("favs")}>♥ {favs.length}</button>
              <button className={`hbadge ${shopCount?"lit":""}`} onClick={()=>setTab("shop")}>🛒 {shopCount}</button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          {[
            {id:"ideas",icon:"✨",label:"Ideas"},
            {id:"fridge",icon:"🧊",label:"Fridge",n:fridgeIngs.length},
            {id:"chat",icon:"👨‍🍳",label:"Ask"},
            {id:"recipe",icon:"📖",label:"Recipe"},
            {id:"favs",icon:"♥",label:"Saved",n:favs.length},
            {id:"shop",icon:"🛒",label:"List",n:shopCount},
          ].map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              {t.n>0&&<span className="tab-pip">{t.n}</span>}
              <span className="tab-icon">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div className="content">

          {/* ── IDEAS ── */}
          {tab==="ideas"&&<>
            <div className="sec-title">What's for dinner?</div>
            <div className="sec-sub">Pick your vibe and get inspired</div>
            <div className="mood-row">{MOODS.map(m=><button key={m.id} className={`mood-btn ${mood===m.id?"active":""}`} onClick={()=>{setMood(m.id);setAiMeals([]);}}>{m.label}</button>)}</div>
            <button className="gen-btn" onClick={generateAi} disabled={genning}>
              {genning?<><div className="dots"><span/><span/><span/></div>Chef is thinking...</>:"✨ Surprise me with AI"}
            </button>
            {aiMeals.length>0&&<>
              <div className="divider">AI suggestions</div>
              {aiMeals.map((m,i)=>(
                <div key={i} className="meal-card" style={{animationDelay:`${i*.07}s`}} onClick={()=>{setTab("chat");setInput(`Full recipe for: ${m.name}`);}}>
                  <div className="meal-top">
                    <div className="meal-emoji" style={{background:m.color}}>{m.emoji}</div>
                    <div className="meal-info"><div className="meal-name">{m.name}</div><div className="meal-desc">{m.desc}</div></div>
                  </div>
                  <div className="meal-footer"><div className="tags"><span className="tag r">{m.time}</span></div></div>
                </div>
              ))}
              <div className="ad-strip"><span style={{fontSize:22}}>🛒</span><div><div className="ad-micro">Partner</div><div className="ad-text">Fresh ingredients, delivered</div></div><button className="ad-cta">Shop now</button></div>
            </>}
            <div className="divider">Today's picks</div>
            {meals.map((meal,i)=>(
              <div key={meal.id} className={`meal-card ${isFav(meal.id)?"fav":""}`} style={{animationDelay:`${i*.07}s`}} onClick={()=>openRecipe(meal)}>
                <div className="meal-top">
                  <div className="meal-emoji" style={{background:meal.bg}}>{meal.emoji}</div>
                  <div className="meal-info"><div className="meal-name">{meal.name}</div><div className="meal-desc">{meal.desc}</div></div>
                </div>
                <div className="meal-footer">
                  <div className="tags">{meal.tags.map((t,j)=><span key={j} className={`tag ${meal.tc[j]}`}>{t}</span>)}</div>
                  <div className="actions">
                    <button className={`ic-btn ${isFav(meal.id)?"yfav":""}`} onClick={e=>toggleFav(meal,e)}>♥</button>
                    <button className={`ic-btn ${inCart(meal.id)?"gcart":""}`} onClick={e=>addToCart(meal,e)}>🛒</button>
                  </div>
                </div>
              </div>
            ))}
          </>}

          {/* ── FRIDGE ── */}
          {tab==="fridge"&&<>
            <div className="fridge-hero">
              <div className="fridge-hero-title">What's in your fridge?</div>
              <div className="fridge-hero-sub">Add your ingredients and Chef will find the best recipes you can make right now.</div>
            </div>

            <div className="ing-input-row">
              <input
                className="ing-input"
                placeholder="Type an ingredient..."
                value={ingInput}
                onChange={e=>setIngInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addIng()}
              />
              <button className="add-ing-btn" onClick={addIng} disabled={!ingInput.trim()}>+</button>
            </div>

            {fridgeIngs.length>0&&(
              <div className="ing-chips">
                {fridgeIngs.map(ing=>(
                  <div key={ing} className="ing-chip">
                    {ing}
                    <button className="chip-del" onClick={()=>removeIng(ing)}>×</button>
                  </div>
                ))}
              </div>
            )}

            <div className="divider">Quick add</div>
            <div className="quick-chips">
              {QUICK_INGS.map(ing=>(
                <button key={ing} className="quick-chip"
                  style={fridgeIngs.includes(ing)?{background:"var(--blue-l)",color:"var(--blue)",borderColor:"var(--blue)"}:{}}
                  onClick={()=>toggleQuickIng(ing)}>
                  {fridgeIngs.includes(ing)?"✓ ":""}{ing}
                </button>
              ))}
            </div>

            <button className="fridge-gen-btn" onClick={generateFridgeRecipes} disabled={fridgeLoading||fridgeIngs.length===0}>
              {fridgeLoading
                ?<><div className="dots"><span/><span/><span/></div>Finding recipes...</>
                :fridgeIngs.length===0
                  ?"Add ingredients first"
                  :`🔍 Find recipes with my ${fridgeIngs.length} ingredient${fridgeIngs.length>1?"s":""}`}
            </button>

            {fridgeResults.length>0&&<>
              <div className="divider">What you can make</div>
              {fridgeResults.map((r,i)=>(
                <div key={i} className="fridge-result-card" style={{animationDelay:`${i*.08}s`}}>
                  <div className="frc-header">
                    <span className="frc-emoji">{r.emoji}</span>
                    <span className="frc-name">{r.name}</span>
                    <span className="frc-time">⏱ {r.time}</span>
                  </div>
                  <div className="frc-desc">{r.desc}</div>
                  {r.missing&&r.missing.length>0&&r.missing[0]!==""&&(
                    <div className="frc-missing">
                      <strong>You'll also need:</strong> {r.missing.join(", ")}
                    </div>
                  )}
                  <div className="frc-actions">
                    <button className="frc-btn primary" onClick={()=>{
                      const pseudo={id:`fridge-${i}`,emoji:r.emoji,bg:"#EBF2FB",name:r.name,desc:r.desc,tags:[r.time,"Fridge recipe"],tc:["b","b"],recipe:{time:r.time,serves:"2",ingredients:[...(r.uses||[]),...(r.missing||[])].filter(Boolean),steps:r.steps||[]}};
                      openRecipe(pseudo);
                    }}>📖 Full recipe</button>
                    <button className="frc-btn sec" onClick={()=>{
                      setTab("chat");
                      setInput(`Give me detailed tips to make "${r.name}" with: ${fridgeIngs.join(", ")}`);
                    }}>💬 Ask Chef</button>
                  </div>
                </div>
              ))}
              <div className="ad-strip">
                <span style={{fontSize:22}}>🛍️</span>
                <div><div className="ad-micro">Partner</div><div className="ad-text">Missing something? Order it fast</div></div>
                <button className="ad-cta">Shop now</button>
              </div>
            </>}
          </>}

          {/* ── CHAT ── */}
          {tab==="chat"&&<div className="chat-wrap">
            <div className="msgs">
              {msgs.map((m,i)=>(
                <div key={i} className={`msg ${m.role}`}>
                  <div className="msg-who">{m.role==="chef"?"👨‍🍳 Chef":"You"}</div>
                  {m.text}
                </div>
              ))}
              {loading&&<div className="msg chef"><div className="msg-who">👨‍🍳 Chef</div><div className="dots"><span/><span/><span/></div></div>}
              <div ref={endRef}/>
            </div>
            <div className="chat-bar">
              <input className="chat-in" placeholder="What's in your fridge? What shall I cook?" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
              <button className="send-btn" onClick={send} disabled={loading||!input.trim()}>➤</button>
            </div>
          </div>}

          {/* ── RECIPE ── */}
          {tab==="recipe"&&<>
            {selected?(
              <>
                <div className="recipe-hero" data-emoji={selected.emoji}>
                  <div className="rh-title">{selected.name}</div>
                  <div className="r-meta"><span>⏱ {selected.recipe.time}</span><span>👥 {selected.recipe.serves} servings</span></div>
                </div>
                <div className="r-acts">
                  <button className={`r-act ${isFav(selected.id)?"yfav":""}`} onClick={()=>toggleFav(selected)}>{isFav(selected.id)?"♥ Saved":"♡ Save"}</button>
                  <button className={`r-act ${inCart(selected.id)?"gcart":""}`} onClick={()=>addToCart(selected)}>{inCart(selected.id)?"✓ In list":"🛒 Add to list"}</button>
                </div>
                <div className="r-block">
                  <div className="rb-title">Ingredients</div>
                  <ul className="ing-list">{selected.recipe.ingredients.map((ing,i)=><li key={i} className="ing-item"><span className="ing-dot"/>{ing}</li>)}</ul>
                </div>
                <div className="r-block">
                  <div className="rb-title">Method</div>
                  <ol className="steps-list">{selected.recipe.steps.map((s,i)=><li key={i} className="step-row"><span className="step-n">{i+1}</span><span className="step-t">{s}</span></li>)}</ol>
                </div>
                <button className="outline-btn" onClick={()=>{setTab("chat");setInput(`Tips for the perfect ${selected.name}?`);}}>💬 Ask Chef for tips</button>
              </>
            ):(
              <div className="empty-state"><div className="empty-icon">📖</div><div className="empty-title">No recipe open</div><div className="empty-sub">Tap a meal in Ideas or Fridge to see its full recipe here.</div></div>
            )}
          </>}

          {/* ── FAVORITES ── */}
          {tab==="favs"&&<>
            <div className="sec-title">Saved recipes</div>
            <div className="sec-sub">{favs.length} meal{favs.length!==1?"s":""} saved</div>
            {favs.length===0?(
              <div className="empty-state"><div className="empty-icon">♡</div><div className="empty-title">Nothing saved yet</div><div className="empty-sub">Tap ♥ on any meal to save it here.</div></div>
            ):favs.map((meal,i)=>(
              <div key={meal.id} className="meal-card fav" style={{animationDelay:`${i*.07}s`}} onClick={()=>openRecipe(meal)}>
                <div className="meal-top">
                  <div className="meal-emoji" style={{background:meal.bg}}>{meal.emoji}</div>
                  <div className="meal-info"><div className="meal-name">{meal.name}</div><div className="meal-desc">{meal.desc}</div></div>
                </div>
                <div className="meal-footer">
                  <div className="tags">{meal.tags.map((t,j)=><span key={j} className={`tag ${meal.tc[j]}`}>{t}</span>)}</div>
                  <div className="actions">
                    <button className="ic-btn yfav" onClick={e=>toggleFav(meal,e)}>♥</button>
                    <button className={`ic-btn ${inCart(meal.id)?"gcart":""}`} onClick={e=>addToCart(meal,e)}>🛒</button>
                  </div>
                </div>
              </div>
            ))}
          </>}

          {/* ── SHOPPING ── */}
          {tab==="shop"&&<>
            <div className="sec-title">Shopping list</div>
            <div className="sec-sub">{shopCount} item{shopCount!==1?"s":""} to buy</div>
            {cart.length===0?(
              <div className="empty-state"><div className="empty-icon">🛒</div><div className="empty-title">Your list is empty</div><div className="empty-sub">Tap 🛒 on any meal to add its ingredients automatically.</div></div>
            ):<>
              {Object.entries(bySource).map(([src,items])=>(
                <div key={src}>
                  <div className="shop-src">{src}</div>
                  {items.map(item=>(
                    <div key={item.id} className={`shop-item ${item.done?"done":""}`}>
                      <button className={`chk ${item.done?"on":""}`} onClick={()=>setCart(p=>p.map(c=>c.id===item.id?{...c,done:!c.done}:c))}>✓</button>
                      <span className="shop-txt">{item.text}</span>
                      <button className="del-btn" onClick={()=>setCart(p=>p.filter(c=>c.id!==item.id))}>×</button>
                    </div>
                  ))}
                </div>
              ))}
              {cart.some(c=>c.done)&&<button className="clear-btn" onClick={()=>setCart(p=>p.filter(c=>!c.done))}>Remove checked items</button>}
              <div className="ad-strip" style={{marginTop:16}}>
                <span style={{fontSize:22}}>🚀</span>
                <div><div className="ad-micro">Partner</div><div className="ad-text">Order everything in one click</div></div>
                <button className="ad-cta">Try now</button>
              </div>
            </>}
          </>}

        </div>
      </div>
    </>
  );
}
