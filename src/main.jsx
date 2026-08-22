import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Filter, Heart, Menu, Minus,
  Plus, Search, ShoppingBag, Sparkles, Star, Truck, X, ShieldCheck,
  SlidersHorizontal, Trash2, UserRound
} from "lucide-react";
import { BrowserRouter, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const products = [
  { id:1, name:"Cloud Runner Mini", category:"Sneakers", age:"2-5 Years", gender:"Unisex", price:899, mrp:1399, rating:4.8, reviews:126, colors:["Sky","Peach"], sizes:["5C","6C","7C","8C","9C","10C"], badge:"Best Seller", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", description:"A feather-light everyday sneaker with a cushioned sole and easy-on design for busy little feet." },
  { id:2, name:"Dino Dash", category:"Sports", age:"5-8 Years", gender:"Boys", price:1099, mrp:1599, rating:4.7, reviews:94, colors:["Green","Black"], sizes:["10C","11C","12C","13C","1Y","2Y"], badge:"New", image:"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=85", description:"Playground-ready sports shoes built for running, jumping and all-day adventures." },
  { id:3, name:"Rainbow Pop", category:"Casual", age:"2-5 Years", gender:"Girls", price:749, mrp:1199, rating:4.6, reviews:71, colors:["Pink","Lilac"], sizes:["5C","6C","7C","8C","9C"], badge:"-38%", image:"https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=900&q=85", description:"Bright, cheerful casual shoes with a soft footbed and flexible outsole." },
  { id:4, name:"Little Trek", category:"Sneakers", age:"8-12 Years", gender:"Unisex", price:1299, mrp:1899, rating:4.9, reviews:208, colors:["White","Blue"], sizes:["1Y","2Y","3Y","4Y","5Y"], badge:"Top Rated", image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=85", description:"A clean everyday sneaker designed for school, weekends and everything in between." },
  { id:5, name:"Sunny Sandal", category:"Sandals", age:"2-5 Years", gender:"Girls", price:599, mrp:899, rating:4.5, reviews:55, colors:["Yellow","Pink"], sizes:["5C","6C","7C","8C","9C"], badge:"Summer Pick", image:"https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=85", description:"Breathable open-toe sandals with a secure strap and comfy cushioned footbed." },
  { id:6, name:"School Pro", category:"School Shoes", age:"5-8 Years", gender:"Unisex", price:799, mrp:999, rating:4.7, reviews:173, colors:["Black"], sizes:["10C","11C","12C","13C","1Y","2Y"], badge:"School", image:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=85", description:"Smart, durable school shoes with a comfortable fit for long classroom days." },
  { id:7, name:"Comfy Clog", category:"Clogs", age:"5-8 Years", gender:"Unisex", price:699, mrp:999, rating:4.6, reviews:83, colors:["Blue","Orange"], sizes:["10C","11C","12C","13C","1Y"], badge:"Easy Wear", image:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=85", description:"Easy slip-on clogs for quick trips, playtime and after-school adventures." },
  { id:8, name:"Sprint Jr", category:"Sports", age:"8-12 Years", gender:"Boys", price:1399, mrp:1999, rating:4.8, reviews:149, colors:["Black","Red"], sizes:["1Y","2Y","3Y","4Y","5Y"], badge:"Fast Pick", image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85", description:"Responsive sports shoes with breathable mesh and extra grip for active kids." },
  { id:9, name:"Butterfly Walk", category:"Casual", age:"5-8 Years", gender:"Girls", price:849, mrp:1299, rating:4.7, reviews:68, colors:["Lavender","White"], sizes:["10C","11C","12C","13C","1Y"], badge:"Cute Pick", image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85", description:"Playful casual shoes with a cushioned insole and flexible everyday construction." },
  { id:10, name:"Tiny Trekker", category:"Sneakers", age:"0-2 Years", gender:"Unisex", price:649, mrp:899, rating:4.8, reviews:112, colors:["Cream","Blue"], sizes:["2C","3C","4C","5C"], badge:"Baby Pick", image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85", description:"Soft first walkers with a flexible sole and gentle fit for growing feet." },
  { id:11, name:"Playday Slip-On", category:"Casual", age:"8-12 Years", gender:"Unisex", price:999, mrp:1499, rating:4.6, reviews:91, colors:["Navy","Grey"], sizes:["1Y","2Y","3Y","4Y","5Y"], badge:"Easy Wear", image:"https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=900&q=85", description:"Easy slip-on style for kids who want to get ready and go." },
  { id:12, name:"Rainbow Runner", category:"Sports", age:"2-5 Years", gender:"Girls", price:949, mrp:1399, rating:4.7, reviews:87, colors:["Pink","Mint"], sizes:["5C","6C","7C","8C","9C","10C"], badge:"Trending", image:"https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=900&q=85", description:"Colorful active shoes with lightweight cushioning for energetic little runners." }
];

const categories = ["All","Sneakers","Sports","Casual","Sandals","School Shoes","Clogs"];
const ages = ["All Ages","0-2 Years","2-5 Years","5-8 Years","8-12 Years"];

// Reveal elements marked with [data-reveal] as they scroll into view.
// One shared observer, re-scanned whenever the route changes.
function useScrollReveal(dep) {
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-reveal]:not(.revealed)")];
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

const StoreContext = createContext(null);

function StoreProvider({children}) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("tinysteps-cart") || "[]"));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("tinysteps-wishlist") || "[]"));

  useEffect(() => localStorage.setItem("tinysteps-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("tinysteps-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (product, size="") => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) return prev.map(i => i.id === product.id && i.size === size ? {...i, qty:i.qty+1} : i);
      return [...prev, {...product, size, qty:1}];
    });
  };
  const updateQty = (id,size,delta) => setCart(prev => prev.map(i => i.id===id && i.size===size ? {...i,qty:Math.max(1,i.qty+delta)} : i));
  const removeItem = (id,size) => setCart(prev => prev.filter(i => !(i.id===id && i.size===size)));
  const toggleWishlist = id => setWishlist(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);

  const value = useMemo(() => ({
    cart, wishlist, addToCart, updateQty, removeItem, toggleWishlist,
    cartCount: cart.reduce((s,i)=>s+i.qty,0),
    cartTotal: cart.reduce((s,i)=>s+i.price*i.qty,0)
  }), [cart,wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
const useStore = () => useContext(StoreContext);

const NAV_LINKS = [
  ["/shop","Shop"],
  ["/shop?age=0-2%20Years","Baby"],
  ["/shop?category=Sneakers","Sneakers"],
  ["/shop?category=Sports","Sports"],
  ["/shop?category=School%20Shoes","School"],
  ["/shop?sale=true","Sale"],
];

function Header() {
  const {cartCount,wishlist} = useStore();
  const [searchOpen,setSearchOpen] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submit = e => {
    e.preventDefault();
    if(query.trim()) navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  // Close the drawer whenever the route changes (covers link taps + back/forward).
  useEffect(()=>{ setMenuOpen(false); setSearchOpen(false); }, [location.pathname, location.search]);

  // Lock body scroll while the drawer is open; close on Escape.
  useEffect(()=>{
    if(!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = e => { if(e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return ()=>{ document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <>
    <header className="header">
      <div className="announcement">Free delivery on orders above ₹999 <span>•</span> Easy 7-day returns</div>
      <div className="nav-wrap">
        <button className="icon-btn mobile-menu" onClick={()=>setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-nav"><Menu size={21}/></button>
        <Link to="/" className="logo"><span>Tiny</span>Steps</Link>
        <nav className="main-nav">
          {NAV_LINKS.map(([to,label])=>(
            <Link key={to} to={to} className={label==="Sale"?"sale-link":undefined}>{label}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={()=>setSearchOpen(v=>!v)} aria-label="Search"><Search size={20}/></button>
          <Link className="icon-btn desktop-user" to="/account"><UserRound size={20}/></Link>
          <Link className="icon-btn heart-icon" to="/wishlist"><Heart size={20}/><i>{wishlist.length}</i></Link>
          <Link className="icon-btn bag-icon" to="/cart"><ShoppingBag size={20}/><i>{cartCount}</i></Link>
        </div>
      </div>
      {searchOpen && <form className="search-bar" onSubmit={submit}><Search size={19}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search shoes, sneakers, sandals..." /><button type="button" onClick={()=>setSearchOpen(false)}><X size={18}/></button></form>}
      </header>

      <div className={`mobile-nav-overlay ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(false)} aria-hidden="true"></div>
      <aside id="mobile-nav" className={`mobile-nav ${menuOpen?"open":""}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-head">
          <Link to="/" className="logo" onClick={()=>setMenuOpen(false)}><span>Tiny</span>Steps</Link>
          <button className="icon-btn" onClick={()=>setMenuOpen(false)} aria-label="Close menu"><X size={22}/></button>
        </div>
        <nav className="mobile-nav-links">
          {NAV_LINKS.map(([to,label])=>(
            <Link key={to} to={to} className={label==="Sale"?"sale-link":undefined} onClick={()=>setMenuOpen(false)}>{label}<ArrowRight size={18}/></Link>
          ))}
        </nav>
        <Link to="/account" className="mobile-nav-account" onClick={()=>setMenuOpen(false)}><UserRound size={19}/> My account</Link>
      </aside>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={16}/> Made for little adventures</div>
        <h1>Big adventures.<br/><em>Tiny feet.<svg className="squiggle" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M5 15 Q 42 3 80 12 T 155 12 T 230 12 T 296 9"/></svg></em></h1>
        <p>Playful, comfy shoes designed for every little step — from first walkers to school-day champions.</p>
        <div className="hero-buttons">
          <Link className="btn primary" to="/shop">Shop the collection <ArrowRight size={18}/></Link>
          <Link className="text-link" to="/shop?age=0-2%20Years">Shop baby shoes <ArrowRight size={16}/></Link>
        </div>
        <div className="hero-trust"><span><Check size={15}/> Kid-tested comfort</span><span><Check size={15}/> Easy returns</span></div>
      </div>
      <div className="hero-art">
        <div className="sun"></div>
        <div className="blob blob-one"></div>
        <div className="blob blob-two"></div>
        <img src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1100&q=90" alt="Kids sneakers"/>
        <div className="floating-card"><span className="float-icon">★</span><div><strong>4.8/5</strong><small>Loved by parents</small></div></div>
        <Sparkles className="spark s1" size={22}/>
        <Sparkles className="spark s2" size={15}/>
        <Sparkles className="spark s3" size={19}/>
      </div>
    </section>
  );
}

function CategoryTiles() {
  const tiles = [
    ["0-2 Years","First steps","👶","0-2 Years"],
    ["2-5 Years","Little explorers","🧸","2-5 Years"],
    ["5-8 Years","Play all day","⚡","5-8 Years"],
    ["8-12 Years","Big kid energy","🚀","8-12 Years"]
  ];
  return <section className="section"><div className="section-head" data-reveal="left"><div><span className="kicker">Find their fit</span><h2>Shop by age</h2></div><Link to="/shop">View all <ArrowRight size={17}/></Link></div><div className="age-grid">{tiles.map((t,i)=><Link to={`/shop?age=${encodeURIComponent(t[3])}`} className="age-card" data-reveal="scale" style={{"--i":i}} key={t[0]}><span className="age-emoji">{t[2]}</span><div><b>{t[0]}</b><small>{t[1]}</small></div><ArrowRight size={18}/></Link>)}</div></section>;
}

function ProductCard({product, index=0}) {
  const {toggleWishlist,wishlist,addToCart} = useStore();
  const wish = wishlist.includes(product.id);
  return (
    <article className="product-card" data-reveal="scale" style={{"--i": index % 8}}>
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name}/></Link>
        <span className="badge">{product.badge}</span>
        <button className={`wish ${wish?"active":""}`} onClick={()=>toggleWishlist(product.id)} aria-label="Wishlist"><Heart size={18} fill={wish?"currentColor":"none"}/></button>
        <button className="quick-add" onClick={()=>addToCart(product, product.sizes[0])}>Quick add</button>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <div className="rating"><Star size={14} fill="currentColor"/><span>{product.rating}</span><small>({product.reviews})</small></div>
        <div className="price"><strong>₹{product.price.toLocaleString("en-IN")}</strong><del>₹{product.mrp.toLocaleString("en-IN")}</del><span>{Math.round((1-product.price/product.mrp)*100)}% off</span></div>
        <div className="swatches">{product.colors.map(c=><span key={c} title={c}></span>)}</div>
      </div>
    </article>
  );
}

function ProductRow({title,productsToShow}) {
  return <section className="section"><div className="section-head" data-reveal="left"><div><span className="kicker">Little favourites</span><h2>{title}</h2></div><Link to="/shop">Shop all <ArrowRight size={17}/></Link></div><div className="product-grid">{productsToShow.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></section>;
}

function Home() {
  return <>
    <Header/>
    <main>
      <Hero/>
      <div className="pill-strip"><div className="pill-track">{[0,1].map(k=>["🚚 Free shipping over ₹999","↩ 7-day easy returns","🛡️ Secure payments","✨ Parent-approved comfort"].map((t,i)=><span key={`${k}-${i}`}>{t}</span>))}</div></div>
      <CategoryTiles/>
      <ProductRow title="Best sellers" productsToShow={products.slice(0,4)}/>
      <section className="promo" data-reveal="scale"><div><span className="kicker">Back to school</span><h2>Ready, set, school.</h2><p>Smart, comfy shoes that can keep up from the first bell to the last game.</p><Link className="btn light" to="/shop?category=School%20Shoes">Shop school shoes <ArrowRight size={17}/></Link></div><div className="promo-shapes"><span>🎒</span><span>👟</span><span>✏️</span></div></section>
      <ProductRow title="Trending now" productsToShow={products.slice(4,8)}/>
      <section className="size-banner" data-reveal="scale"><div><span className="kicker">Not sure about the size?</span><h2>We make tiny feet easy.</h2><p>Use our simple size guide to find their best fit before you order.</p></div><Link className="btn primary" to="/size-guide">Find their size</Link></section>
    </main>
    <Footer/>
  </>;
}

function Shop() {
  const params = new URLSearchParams(useLocation().search);
  const initialCategory = params.get("category") || "All";
  const initialAge = params.get("age") || "All Ages";
  const initialSearch = params.get("search") || "";
  const [category,setCategory] = useState(initialCategory);
  const [age,setAge] = useState(initialAge);
  const [search,setSearch] = useState(initialSearch);
  const [sort,setSort] = useState("featured");
  const [price,setPrice] = useState(2000);
  const [filterOpen,setFilterOpen] = useState(false);

  const filtered = products.filter(p =>
    (category==="All" || p.category===category) &&
    (age==="All Ages" || p.age===age) &&
    p.price<=price &&
    (!search || `${p.name} ${p.category} ${p.age}`.toLowerCase().includes(search.toLowerCase()))
  ).sort((a,b)=> sort==="low" ? a.price-b.price : sort==="high" ? b.price-a.price : sort==="rating" ? b.rating-a.rating : 0);

  return <>
    <Header/>
    <main className="shop-page">
      <div className="shop-hero"><span className="kicker">TinySteps collection</span><h1>Find their next favourite pair.</h1><p>Comfy, playful footwear for every age, stage and adventure.</p></div>
      <div className="shop-layout">
        <aside className={`filters ${filterOpen?"open":""}`}>
          <div className="filter-title"><b>Filters</b><button onClick={()=>setFilterOpen(false)}><X size={18}/></button></div>
          <label>Category</label>
          <div className="filter-list">{categories.map(c=><button className={category===c?"selected":""} key={c} onClick={()=>setCategory(c)}>{c}<span>{c==="All"?products.length:products.filter(p=>p.category===c).length}</span></button>)}</div>
          <label>Age</label>
          <div className="filter-list">{ages.map(a=><button className={age===a?"selected":""} key={a} onClick={()=>setAge(a)}>{a}</button>)}</div>
          <label>Max price <b>₹{price}</b></label>
          <input className="range" type="range" min="500" max="2000" step="50" value={price} onChange={e=>setPrice(+e.target.value)}/>
          <div className="price-range"><span>₹500</span><span>₹2,000</span></div>
          <button className="clear" onClick={()=>{setCategory("All");setAge("All Ages");setPrice(2000);setSearch("")}}>Clear all</button>
        </aside>
        <section className="results">
          <div className="results-head"><div><b>{filtered.length} styles</b>{search && <span className="search-result"> for “{search}”</span>}</div><div className="result-actions"><button className="filter-mobile" onClick={()=>setFilterOpen(true)}><SlidersHorizontal size={17}/> Filters</button><div className="sort"><span>Sort:</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option></select><ChevronDown size={15}/></div></div></div>
          {filtered.length ? <div className="product-grid shop-grid">{filtered.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div> : <div className="empty"><span>🔎</span><h3>No tiny shoes found</h3><p>Try a different age, category or price range.</p></div>}
        </section>
      </div>
    </main>
    <Footer/>
  </>;
}

function ProductPage() {
  const {id} = useParams();
  const product = products.find(p=>p.id===Number(id)) || products[0];
  const {addToCart,toggleWishlist,wishlist} = useStore();
  const [size,setSize] = useState(product.sizes[0]);
  const [added,setAdded] = useState(false);
  const navigate = useNavigate();
  const wish = wishlist.includes(product.id);

  const add = () => { addToCart(product,size); setAdded(true); setTimeout(()=>setAdded(false),1500); };
  return <>
    <Header/>
    <main className="product-page">
      <Link to="/shop" className="back-link"><ArrowLeft size={17}/> Back to shop</Link>
      <div className="product-detail">
        <div className="detail-image"><img src={product.image} alt={product.name}/><span className="detail-badge">{product.badge}</span></div>
        <div className="detail-copy">
          <div className="rating large"><Star size={16} fill="currentColor"/><span>{product.rating}</span><small>{product.reviews} reviews</small></div>
          <h1>{product.name}</h1>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-price"><strong>₹{product.price.toLocaleString("en-IN")}</strong><del>₹{product.mrp.toLocaleString("en-IN")}</del><span>{Math.round((1-product.price/product.mrp)*100)}% OFF</span></div>
          <div className="tax">Inclusive of all taxes</div>
          <div className="size-head"><b>Select size</b><Link to="/size-guide">Size guide</Link></div>
          <div className="sizes">{product.sizes.map(s=><button className={size===s?"selected":""} key={s} onClick={()=>setSize(s)}>{s}</button>)}</div>
          <div className="fit-note"><Sparkles size={17}/><div><b>Not sure?</b><span>Most parents find this style true to size.</span></div></div>
          <div className="detail-actions"><button className={`btn primary add-btn ${added?"added":""}`} onClick={add}>{added?<><Check size={18}/> Added to bag</>:<><ShoppingBag size={18}/> Add to bag</>}</button><button className={`wishlist-btn ${wish?"active":""}`} onClick={()=>toggleWishlist(product.id)}><Heart size={20} fill={wish?"currentColor":"none"}/></button></div>
          <div className="benefits"><div><Truck size={20}/><span><b>Free delivery</b><small>On orders over ₹999</small></span></div><div><ShieldCheck size={20}/><span><b>7-day returns</b><small>Easy & hassle-free</small></span></div></div>
        </div>
      </div>
      <ProductRow title="You may also like" productsToShow={products.filter(p=>p.id!==product.id).slice(0,4)}/>
    </main>
    <Footer/>
  </>;
}

function Cart() {
  const {cart,cartTotal,updateQty,removeItem} = useStore();
  const delivery = cartTotal>=999 || cartTotal===0 ? 0 : 79;
  const total = cartTotal+delivery;
  return <>
    <Header/>
    <main className="cart-page">
      <div className="cart-heading"><span className="kicker">Your picks</span><h1>Your shopping bag</h1><p>{cart.length ? `${cart.reduce((s,i)=>s+i.qty,0)} little ${cart.length===1?"item":"items"} ready for an adventure.` : "Your bag is waiting for something tiny and wonderful."}</p></div>
      {!cart.length ? <div className="empty cart-empty"><span>🛍️</span><h2>Your bag is empty</h2><p>Find a pair they'll love.</p><Link className="btn primary" to="/shop">Start shopping</Link></div> :
      <div className="cart-layout"><div className="cart-items">{cart.map(item=><div className="cart-item" key={`${item.id}-${item.size}`}><img src={item.image} alt={item.name}/><div className="cart-item-info"><Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link><p>{item.category} · Size {item.size}</p><div className="qty"><button onClick={()=>updateQty(item.id,item.size,-1)}><Minus size={14}/></button><span>{item.qty}</span><button onClick={()=>updateQty(item.id,item.size,1)}><Plus size={14}/></button></div></div><div className="cart-item-price"><b>₹{(item.price*item.qty).toLocaleString("en-IN")}</b><button onClick={()=>removeItem(item.id,item.size)}><Trash2 size={17}/></button></div></div>)}<Link to="/shop" className="continue"><ArrowLeft size={17}/> Continue shopping</Link></div>
      <aside className="summary"><h2>Order summary</h2><div><span>Subtotal</span><b>₹{cartTotal.toLocaleString("en-IN")}</b></div><div><span>Delivery</span><b>{delivery?"₹79":"FREE"}</b></div>{delivery>0 && <p className="delivery-note">Add ₹{(999-cartTotal).toLocaleString("en-IN")} more for free delivery.</p>}<hr/><div className="total"><span>Total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><Link className="btn primary full" to="/checkout">Proceed to checkout</Link><div className="secure"><ShieldCheck size={16}/> Secure checkout</div></aside></div>}
    </main>
    <Footer/>
  </>;
}

function Checkout() {
  const {cart,cartTotal} = useStore();
  const [placed,setPlaced] = useState(false);
  if (!cart.length && !placed) return <><Header/><div className="empty checkout-empty"><span>🛒</span><h2>Your bag is empty</h2><Link className="btn primary" to="/shop">Shop now</Link></div><Footer/></>;
  if (placed) return <><Header/><div className="success"><div className="success-icon"><Check size={32}/></div><span className="kicker">Order confirmed</span><h1>Yay! Their new pair is on its way.</h1><p>Thanks for shopping TinySteps. Your demo order has been placed successfully.</p><Link className="btn primary" to="/shop">Continue shopping</Link></div><Footer/></>;
  const delivery = cartTotal>=999?0:79;
  return <>
    <Header/>
    <main className="checkout-page">
      <div className="checkout-form"><Link to="/cart" className="back-link"><ArrowLeft size={17}/> Back to bag</Link><h1>Checkout</h1><div className="form-section"><h3>Contact</h3><input placeholder="Email or mobile number"/><label className="check-row"><input type="checkbox"/> Email me order updates</label></div><div className="form-section"><h3>Delivery address</h3><div className="two"><input placeholder="First name"/><input placeholder="Last name"/></div><input placeholder="Address / Flat / House no."/><div className="two"><input placeholder="City"/><input placeholder="State"/></div><input placeholder="PIN code"/><input placeholder="Phone number"/></div><div className="form-section"><h3>Payment</h3><button className="payment-choice"><span>◉</span><div><b>Cash on Delivery</b><small>Pay when your little one's shoes arrive</small></div></button><button className="payment-choice muted"><span>○</span><div><b>Online payment</b><small>UPI, cards & netbanking · Demo</small></div></button></div><button className="btn primary full" onClick={()=>setPlaced(true)}>Place demo order · ₹{(cartTotal+delivery).toLocaleString("en-IN")}</button></div>
      <aside className="summary checkout-summary"><h2>Your bag</h2>{cart.map(i=><div className="mini-item" key={`${i.id}-${i.size}`}><img src={i.image}/><span>{i.name} × {i.qty}<small>Size {i.size}</small></span><b>₹{(i.price*i.qty).toLocaleString("en-IN")}</b></div>)}<hr/><div><span>Subtotal</span><b>₹{cartTotal.toLocaleString("en-IN")}</b></div><div><span>Delivery</span><b>{delivery?"₹79":"FREE"}</b></div><div className="total"><span>Total</span><strong>₹{(cartTotal+delivery).toLocaleString("en-IN")}</strong></div></aside>
    </main>
    <Footer/>
  </>;
}

function Wishlist() {
  const {wishlist} = useStore();
  const items = products.filter(p=>wishlist.includes(p.id));
  return <><Header/><main className="wishlist-page"><div className="cart-heading"><span className="kicker">Saved for later</span><h1>Little wish list</h1><p>Your favourite pairs, all in one place.</p></div>{items.length?<div className="product-grid">{items.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>:<div className="empty"><span>♡</span><h2>Nothing saved yet</h2><p>Tap the heart on any pair you love.</p><Link className="btn primary" to="/shop">Explore shoes</Link></div>}</main><Footer/></>;
}

function SizeGuide() {
  return <><Header/><main className="size-page"><div className="cart-heading"><span className="kicker">A little help</span><h1>Find their tiny fit.</h1><p>Use the chart below as a starting point. For growing feet, we recommend leaving a little room.</p></div><div className="size-card"><div className="size-tip"><span>📏</span><div><b>Quick tip</b><p>Measure both feet in the afternoon, standing up. Use the larger foot measurement.</p></div></div><table><thead><tr><th>US Kids</th><th>Foot length</th><th>Approx. age</th><th>Typical TinySteps</th></tr></thead><tbody>{[["2C","10.5 cm","0–1 yr","First walkers"],["3C","11.4 cm","0–1.5 yrs","First walkers"],["4C","12.3 cm","1–2 yrs","Baby"],["5C","13.2 cm","2–3 yrs","Toddler"],["6C","14.0 cm","3–4 yrs","Toddler"],["7C","14.8 cm","4–5 yrs","Toddler"],["8C","15.7 cm","5–6 yrs","Little kid"],["9C","16.6 cm","6–7 yrs","Little kid"],["10C","17.4 cm","7–8 yrs","Little kid"],["1Y","18.3 cm","8–9 yrs","Big kid"],["2Y","19.1 cm","9–10 yrs","Big kid"],["3Y","20.0 cm","10–11 yrs","Big kid"],["4Y","20.8 cm","11–12 yrs","Big kid"]].map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{x}</td>)}</tr>)}</tbody></table></div></main><Footer/></>;
}

function Account(){ return <><Header/><div className="empty account"><span>👋</span><h2>Welcome to TinySteps</h2><p>Account features are coming soon in this demo.</p><Link to="/shop" className="btn primary">Shop shoes</Link></div><Footer/></> }

function Footer(){
  return <footer><div className="footer-main"><div><Link to="/" className="logo footer-logo"><span>Tiny</span>Steps</Link><p>Small shoes. Big adventures.<br/>Made for growing feet and curious minds.</p><div className="socials"><span>◎</span><span>f</span><span>◉</span></div></div><div><h4>Shop</h4><Link to="/shop">All shoes</Link><Link to="/shop?category=Sneakers">Sneakers</Link><Link to="/shop?category=Sports">Sports</Link><Link to="/shop?category=School%20Shoes">School shoes</Link></div><div><h4>Help</h4><Link to="/size-guide">Size guide</Link><Link to="/account">My account</Link><Link to="/cart">Shipping & returns</Link></div><div><h4>For parents</h4><p className="newsletter-copy">Get new drops, fit tips and tiny adventures in your inbox.</p><form onSubmit={e=>e.preventDefault()} className="newsletter"><input placeholder="Your email"/><button><ArrowRight size={17}/></button></form></div></div><div className="footer-bottom"><span>© 2026 TinySteps. Demo storefront.</span><span>Secure checkout · Parent-approved</span></div></footer>
}

function App(){
  return <StoreProvider><BrowserRouter><Routes/></BrowserRouter></StoreProvider>
}
function Routes(){
  const location = useLocation();
  const path=location.pathname;
  useScrollReveal(path);
  if(path==="/") return <Home/>;
  if(path==="/shop") return <Shop/>;
  if(path.startsWith("/product/")) return <ProductPage/>;
  if(path==="/cart") return <Cart/>;
  if(path==="/checkout") return <Checkout/>;
  if(path==="/wishlist") return <Wishlist/>;
  if(path==="/size-guide") return <SizeGuide/>;
  if(path==="/account") return <Account/>;
  return <Home/>;
}

createRoot(document.getElementById("root")).render(<App/>);