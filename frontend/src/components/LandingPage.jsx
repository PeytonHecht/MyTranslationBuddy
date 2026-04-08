import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/MTBLogo.png";

    let currentBase = "street";
    map.on("zoomend", () => {
      const z = map.getZoom();
      if (z >= 13 && currentBase === "street") { map.removeLayer(osmLayer); satLayer.addTo(map); currentBase = "satellite"; }
      else if (z < 13 && currentBase === "satellite") { map.removeLayer(satLayer); osmLayer.addTo(map); currentBase = "street"; }
    });

    // City markers
    CITY_COORDS.forEach(pin => {
      const color = PIN_COLORS[pin.country];
      const flag = PIN_EMOJI[pin.country];
      const isUserCity = userCityData && pin.slug === userCityData.slug;
      const isSavedCity = userCities.includes(pin.slug);
      const starBadge = isUserCity ? '<div style="position:absolute;top:-10px;right:-10px;background:#FA4616;color:#fff;font-size:8px;font-weight:800;padding:2px 5px;border-radius:9999px;white-space:nowrap;box-shadow:0 2px 6px rgba(250,70,22,0.4);z-index:3;border:1.5px solid #fff">YOUR CITY</div>' : isSavedCity ? '<div style="position:absolute;top:-8px;right:-10px;background:'+color+';color:#fff;font-size:7px;font-weight:700;padding:2px 5px;border-radius:9999px;white-space:nowrap;box-shadow:0 2px 6px '+color+'55;z-index:3;border:1.5px solid #fff">SAVED</div>' : "";
      const pinScale = isUserCity ? "scale(1.2)" : "scale(1)";
      const icon = L.divIcon({ className:"", html:'<div class="mtb-pin" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative;transform:'+pinScale+'">'+starBadge+'<div class="mtb-pulse" style="position:absolute;top:4px;left:50%;transform:translateX(-50%);width:24px;height:24px;border-radius:50%;background:'+color+';opacity:0.25"></div><svg width="36" height="46" viewBox="0 0 32 42" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));position:relative;z-index:2;transition:transform 0.2s" onmouseover="this.style.transform=\'scale(1.15)\'" onmouseout="this.style.transform=\'scale(1)\'"><path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="'+color+'"/><circle cx="16" cy="15" r="10" fill="#fff"/><text x="16" y="19" text-anchor="middle" font-size="12">'+flag+'</text></svg></div>', iconSize:[36,46], iconAnchor:[18,46], popupAnchor:[0,-46] });
      const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

      const costBg = pin.country === "CH" ? "#FEF3C7" : "#D1FAE5";
      const costCol = pin.country === "CH" ? "#92400E" : "#065F46";
      marker.bindTooltip('<div style="font-family:Inter,system-ui,sans-serif;padding:12px 14px;min-width:240px;max-width:320px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><strong style="font-size:0.95rem;color:#111827">'+flag+' '+pin.name+'</strong><span style="font-size:0.6rem;font-weight:700;color:#fff;background:'+color+';padding:2px 8px;border-radius:9999px">'+COUNTRY_LABELS[pin.country]+'</span></div><div style="font-size:0.78rem;color:#4B5563;line-height:1.5;margin-bottom:8px">'+pin.desc+'</div>'+(pin.uni?'<div style="font-size:0.72rem;color:#0021A5;font-weight:600;margin-bottom:8px">\uD83C\uDFEB '+pin.uni+'</div>':'')+'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">'+(pin.cost?'<span style="font-size:0.62rem;font-weight:600;background:'+costBg+';color:'+costCol+';padding:3px 8px;border-radius:4px"><span style="opacity:0.7;font-size:0.55rem;display:block;line-height:1;margin-bottom:1px">AVG RENT</span>\uD83D\uDCB0 '+pin.cost+'</span>':'')+(pin.beer?'<span style="font-size:0.62rem;font-weight:600;background:#FFF7ED;color:#92400E;padding:3px 8px;border-radius:4px"><span style="opacity:0.7;font-size:0.55rem;display:block;line-height:1;margin-bottom:1px">BEER</span>\uD83C\uDF7A '+pin.beer+'</span>':'')+(pin.transit?'<span style="font-size:0.62rem;font-weight:600;background:#EEF2FF;color:#4338CA;padding:3px 8px;border-radius:4px"><span style="opacity:0.7;font-size:0.55rem;display:block;line-height:1;margin-bottom:1px">TRANSIT</span>\uD83D\uDE83 '+pin.transit+'</span>':'')+'</div>'+(pin.mustDo?'<div style="font-size:0.7rem;color:#059669;font-weight:600;background:#ECFDF5;padding:5px 8px;border-radius:6px;border:1px solid #A7F3D0;margin-bottom:6px">\u2B50 '+pin.mustDo+'</div>':'')+'<div style="font-size:0.64rem;font-weight:600;color:#0021A5;text-align:center;padding-top:4px;border-top:1px solid #E5E7EB">Click for city details</div></div>', { direction:"top", offset:[0,-10], opacity:0.97, className:"city-tooltip" });

      marker.on("click", () => {
        setSelectedPin(pin);
        map.flyTo([pin.lat, pin.lng], 13, { duration: 1.2 });
      });
    });

    // Landmark markers
    const CAT_COLORS = { culture:"#4338CA", food:"#EA580C", nature:"#059669", nightlife:"#9333EA", default:"#6B7280" };
    const CAT_LABELS = { culture:"Culture", food:"Food & Drink", nature:"Nature", nightlife:"Nightlife", default:"Spot" };
    const landmarkLayer = L.layerGroup();
    LANDMARKS.forEach(lm => {
      const lIcon = L.divIcon({ className:"", html:'<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid #E5E7EB;box-shadow:0 2px 8px rgba(0,0,0,0.18);font-size:15px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.transform=\'scale(1.25)\';this.style.borderColor=\'#FA4616\';this.style.boxShadow=\'0 4px 16px rgba(250,70,22,0.3)\'" onmouseout="this.style.transform=\'scale(1)\';this.style.borderColor=\'#E5E7EB\';this.style.boxShadow=\'0 2px 8px rgba(0,0,0,0.18)\'">'+lm.icon+'</div>', iconSize:[30,30], iconAnchor:[15,15] });
      const lMarker = L.marker([lm.lat, lm.lng], { icon: lIcon });
      const catColor = CAT_COLORS[lm.cat] || CAT_COLORS.default;
      const catLabel = CAT_LABELS[lm.cat] || CAT_LABELS.default;
      lMarker.bindTooltip('<div style="font-family:Inter,system-ui,sans-serif;padding:10px 12px;max-width:300px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px"><strong style="font-size:0.88rem;color:#111827">'+lm.icon+' '+lm.name+'</strong><span style="font-size:0.58rem;font-weight:700;color:#fff;background:'+catColor+';padding:2px 7px;border-radius:9999px;text-transform:uppercase;letter-spacing:0.05em">'+catLabel+'</span></div><div style="font-size:0.72rem;color:#6B7280;margin-bottom:6px">'+lm.city+'</div>'+(lm.tip?'<div style="font-size:0.74rem;color:#065F46;font-weight:500;background:#ECFDF5;padding:5px 8px;border-radius:6px;border:1px solid #A7F3D0;line-height:1.45;margin-bottom:6px">\uD83D\uDCA1 '+lm.tip+'</div>':'')+'<div style="font-size:0.68rem;text-align:center;padding-top:5px;border-top:1px solid #E5E7EB;color:#0021A5;font-weight:600">\uD83D\uDCCD Click to open in Google Maps</div></div>', { direction:"top", offset:[0,-8], className:"city-tooltip" });

      // Click opens Google Maps
      lMarker.on("click", () => {
        if (lm.url) window.open(lm.url, "_blank", "noopener,noreferrer");
      });

      landmarkLayer.addLayer(lMarker);
    });
    map.on("zoomend", () => {
      if (map.getZoom() >= 8 && !map.hasLayer(landmarkLayer)) landmarkLayer.addTo(map);
      else if (map.getZoom() < 8 && map.hasLayer(landmarkLayer)) map.removeLayer(landmarkLayer);
    });

    // Travel routes
    const routeLayer = L.layerGroup();
    TRAVEL_ROUTES.forEach(r => {
      const fromCity = CITY_COORDS.find(c => c.slug === r.from);
      const toCity = CITY_COORDS.find(c => c.slug === r.to);
      if (!fromCity || !toCity) return;
      const isFree = isStudentFree(r);
      const line = L.polyline([[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]], {
        color: isFree ? "#10B981" : "#FA4616", weight: isFree ? 2.5 : 2, opacity: isFree ? 0.7 : 0.5, dashArray: isFree ? "4, 6" : "8, 8", className: "mtb-route"
      });
      line.bindTooltip('<div style="font-family:Inter,system-ui,sans-serif;padding:8px 10px;text-align:center"><strong style="font-size:0.82rem;color:#111827">'+fromCity.name+' → '+toCity.name+'</strong><div style="display:flex;gap:8px;justify-content:center;margin-top:4px;font-size:0.72rem;color:#4B5563"><span>⏱ '+r.time+'</span><span style="'+(isFree?'color:#059669;font-weight:600':'')+'">'+( isFree ? '🎓 Free' : r.price )+'</span></div>'+(r.type?'<div style="font-size:0.65rem;color:#6B7280;margin-top:3px">'+r.type+'</div>':'')+(isFree?'<div style="font-size:0.62rem;color:#059669;font-weight:600;margin-top:4px;background:#ECFDF5;padding:2px 6px;border-radius:4px;display:inline-block">Included w/ Student Train Pass</div>':'')+'</div>', { sticky: true, className: "city-tooltip" });
      routeLayer.addLayer(line);
    });
    routeLayerRef.current = routeLayer;
    window.__mtbMap__ = map;
    mapInstanceRef.current = map;

    if (userCityData) {
      setTimeout(() => map.flyTo([userCityData.lat, userCityData.lng], 11, { duration: 2 }), 800);
    }

    return () => { if(mapInstanceRef.current){mapInstanceRef.current.remove();mapInstanceRef.current=null;} };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img src={logo} alt="MTB Logo" style={styles.logo} />
      <h1 style={styles.title}>Study Abroad Map</h1>
      <p style={styles.subtitle}>Click a city to log in and see your guides</p>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{...S.heroIn, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)"}}>
          {userName ? (
            <>
              <h1 style={S.heroT}>
                Hey <span style={S.heroHL}>{userName.split(" ")[0]}</span>,
                {userCityData
                  ? <> ready for <span style={S.heroHL}>{userCityData.name}</span>?</>
                  : <> your adventure starts here</>
                }
              </h1>
              <p style={S.heroSub}>
                {userCityData
                  ? `Learn the dialect before you land, find tonight's best event, and stop Googling "how to order in German" — we've got ${userCityData.name} covered.`
                  : `From your first awkward café order to your last Biergarten sunset — ${TOTAL_CITIES} cities, three countries, zero guesswork.`
                }
              </p>
            </>
          ) : (
            <>
              <h1 style={S.heroT}>Your study abroad semester,<br/><span style={S.heroHL}>figured out</span></h1>
              <p style={S.heroSub}>From your first awkward café order to your last Biergarten sunset — {TOTAL_CITIES} cities, three countries, zero guesswork.</p>
            </>
          )}
          <div style={S.heroActs}>
            <button onClick={()=>{ const el=document.getElementById("mtb-map"); if(el) el.scrollIntoView({behavior:"smooth"}); }} style={S.heroP}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 30px rgba(250,70,22,0.5)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(250,70,22,0.4)";}}><Navigation size={18}/> Explore the Map</button>
            <button onClick={()=>navigate("/reservations")} style={S.heroO}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}><Languages size={18}/> Practice Phrases</button>
            <button onClick={()=>navigate("/events")} style={S.heroO}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.14)";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}><Calendar size={18}/> Find Events</button>
          </div>
          {/* Quick stats badge removed — cleaner hero */}
        </div>
        <div style={{position:"absolute",top:"-20%",right:"-10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(250,70,22,0.15),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-30%",left:"-15%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,33,165,0.2),transparent 70%)",pointerEvents:"none"}}/>
      </section>

      {/* QUICK PICKS */}
      <section style={S.picksWrap}>
        <div style={S.picksScroll}>
          {buildQuickPicks(userCities).map((p,i) => (
            <div key={i} onClick={()=>flyToCity(p.slug)} style={S.pickCard}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,0.12)";e.currentTarget.style.borderColor="#FED7AA";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.06)";e.currentTarget.style.borderColor="#E5E7EB";}}>
              <span style={{fontSize:"1.8rem"}}>{p.emoji}</span>
              <div>
                <div style={{fontSize:"0.68rem",fontWeight:700,color:"#FA4616",textTransform:"uppercase",letterSpacing:"0.06em"}}>{p.label}</div>
                <div style={{fontSize:"0.88rem",fontWeight:600,color:"#111827"}}>{p.city}</div>
                <div style={{fontSize:"0.72rem",color:"#6B7280"}}>{p.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAP — full-bleed, no robotic header */}
      <section id="mtb-map" style={S.mapSection}>
        {/* Floating toolbar */}
        <div style={S.mapToolbar}>
          <div style={S.mapSearchWrap}>
            <Search size={14} color="#9CA3AF"/>
            <input value={mapSearch} onChange={e=>setMapSearch(e.target.value)} placeholder={userCities.length > 0 ? 'Search or type "my"' : 'Search cities...'} style={S.mapSearchInput}/>
            {mapSearch && (
              <div style={S.mapSearchDrop}>
                {/* Show user's pinned cities at the top */}
                {userCities.length > 0 && mapSearch.toLowerCase() === "my" && (
                  <div style={{padding:"0.35rem 0.75rem",fontSize:"0.65rem",fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:"1px solid #F3F4F6"}}>📌 Your Cities</div>
                )}
                {userCities.length > 0 && mapSearch.toLowerCase().startsWith("my") && (
                  userCities.map(slug => {
                    const c = CITY_COORDS.find(cc => cc.slug === slug);
                    if (!c) return null;
                    return (
                      <div key={c.slug} onClick={() => { flyToCity(c.slug); setMapSearch(""); }} style={{...S.mapSearchItem, backgroundColor:"#F0FDF4"}}>
                        {PIN_EMOJI[c.country]} {c.name} <span style={{color:"#059669",fontSize:"0.7rem",fontWeight:600}}>📌 Saved</span>
                      </div>
                    );
                  })
                )}
                {CITY_COORDS.filter(c => c.name.toLowerCase().includes(mapSearch.toLowerCase()) && !mapSearch.toLowerCase().startsWith("my")).slice(0,5).map(c => (
                  <div key={c.slug} onClick={() => { flyToCity(c.slug); setMapSearch(""); }} style={S.mapSearchItem}>
                    {PIN_EMOJI[c.country]} {c.name} <span style={{color:"#9CA3AF",fontSize:"0.7rem"}}>{"\u00B7"} {c.uni?.split(",")[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={S.flyBtns}>
            {[{code:"DE",flag:"\uD83C\uDDE9\uD83C\uDDEA"},{code:"AT",flag:"\uD83C\uDDE6\uD83C\uDDF9"},{code:"CH",flag:"\uD83C\uDDE8\uD83C\uDDED"}].map(c => (
              <button key={c.code} onClick={()=>flyToCountry(c.code)} style={S.flyBtn}>{c.flag}</button>
            ))}
            <button onClick={()=>{const m=mapInstanceRef.current;if(m)m.flyTo([48.5,10.5],6,{duration:1});}} style={S.flyBtn}><Globe size={12}/></button>
          </div>
          <button onClick={()=>setShowRoutes(!showRoutes)} style={{...S.routeToggle,...(showRoutes?{backgroundColor:"rgba(250,70,22,0.08)",color:"#FA4616",borderColor:"rgba(250,70,22,0.35)"}:{})}}>
            <Train size={14}/> {showRoutes ? "Hide Train Lines" : "Train Connections"}
          </button>
        </div>

        {/* Floating legend */}
        <div style={S.mapLegend}>
          <span style={{fontSize:"0.58rem",fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em",marginRight:"0.15rem"}}>Map Key</span>
          {Object.entries(PIN_COLORS).map(([k,c])=><span key={k} style={S.legI}><span style={{...S.legD,backgroundColor:c}}/> {COUNTRY_FLAGS[k]} {COUNTRY_LABELS[k]}</span>)}
          <span style={S.legI}><span style={{...S.legD,backgroundColor:"#fff",border:"2px solid #D1D5DB"}}/> Landmarks <span style={{fontSize:"0.55rem",color:"#9CA3AF"}}>(zoom in)</span></span>
          {showRoutes && <><span style={{width:1,height:14,background:"#E5E7EB",flexShrink:0}}/><span style={S.legI}><span style={{width:14,height:2,backgroundColor:"#FA4616",display:"inline-block",borderRadius:1}}/> Paid</span><span style={{...S.legI,display:"flex",alignItems:"center",gap:"0.25rem"}}><span style={{width:14,height:2,backgroundColor:"#10B981",display:"inline-block",borderRadius:1}}/> Student Pass <a href="https://int.bahn.de/en/faq/deutschlandticket-which-trains" target="_blank" rel="noopener noreferrer" title="Learn which trains your student ticket covers" style={{display:"inline-flex",cursor:"pointer",color:"#10B981",fontSize:"0.5rem"}}><Info size={10}/></a></span></>}
        </div>

        <div ref={mapRef} style={S.mapW}/>

        {/* City Preview Panel */}
        {selectedPin && (
          <div style={S.cityPanel}>
            <button onClick={()=>setSelectedPin(null)} style={S.cityPanelX}
              onMouseEnter={e=>{e.currentTarget.style.background="#E5E7EB";e.currentTarget.style.color="#374151";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#F3F4F6";e.currentTarget.style.color="#6B7280";}}><X size={14}/></button>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.75rem"}}>
              <span style={{fontSize:"1.6rem"}}>{PIN_EMOJI[selectedPin.country]}</span>
              <div>
                <h3 style={{fontSize:"1.15rem",fontWeight:700,color:"#111827",margin:0}}>{selectedPin.name}</h3>
                <span style={{fontSize:"0.72rem",color:"#6B7280"}}>{COUNTRY_LABELS[selectedPin.country]}</span>
              </div>
            </div>
            {selectedPin.uni && <div style={S.cpRow}><GraduationCap size={13} color="#0021A5"/><span style={{fontSize:"0.78rem",fontWeight:600,color:"#0021A5"}}>{selectedPin.uni}</span></div>}
            <p style={{fontSize:"0.82rem",color:"#4B5563",lineHeight:1.5,margin:"0 0 0.75rem 0"}}>{selectedPin.desc}</p>
            {selectedPin.vibe && <div style={S.cpVibe}><Coffee size={12}/> Vibe: <strong>{selectedPin.vibe}</strong></div>}
            <div style={S.cpStats}>
              {selectedPin.cost && <div style={S.cpStat}><DollarSign size={12} color="#059669"/><div><span style={{fontSize:"0.58rem",fontWeight:600,color:"#9CA3AF",display:"block",lineHeight:1}}>Avg Rent</span><span>{selectedPin.cost}</span></div></div>}
              {selectedPin.beer && <div style={S.cpStat}><span style={{fontSize:"0.85rem"}}>{"\uD83C\uDF7A"}</span><div><span style={{fontSize:"0.58rem",fontWeight:600,color:"#9CA3AF",display:"block",lineHeight:1}}>Beer Price</span><span>{selectedPin.beer}</span></div></div>}
              {selectedPin.transit && <div style={S.cpStat}><Train size={12} color="#4338CA"/><div><span style={{fontSize:"0.58rem",fontWeight:600,color:"#9CA3AF",display:"block",lineHeight:1}}>Transit</span><span>{selectedPin.transit}</span></div></div>}
            </div>
            {selectedPin.mustDo && <div style={S.cpMustDo}><Star size={12} color="#059669"/> <span>{selectedPin.mustDo}</span></div>}

            {/* Nearby landmarks */}
            {(() => {
              const nearbyLandmarks = LANDMARKS.filter(lm => lm.city === selectedPin.name);
              if (!nearbyLandmarks.length) return null;
              return (
                <div style={{marginTop:"0.75rem"}}>
                  <div style={{fontSize:"0.72rem",fontWeight:700,color:"#374151",marginBottom:"0.4rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><MapPin size={12}/> {nearbyLandmarks.length} places to visit</div>
                  {nearbyLandmarks.map((lm,i) => (
                    <div key={i} style={{...S.cpRoute,cursor:"pointer"}} onClick={()=>lm.url && window.open(lm.url,"_blank","noopener,noreferrer")}>
                      <span>{lm.icon} {lm.name}</span>
                      <ExternalLink size={11} color="#9CA3AF"/>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Nearby routes */}
            {(() => {
              const routes = TRAVEL_ROUTES.filter(r => r.from === selectedPin.slug || r.to === selectedPin.slug);
              if (!routes.length) return null;
              const freeRoutes = routes.filter(r => isStudentFree(r));
              const paidRoutes = routes.filter(r => !isStudentFree(r));
              return (
                <div style={{marginTop:"0.75rem"}}>
                  <div style={{fontSize:"0.72rem",fontWeight:700,color:"#374151",marginBottom:"0.4rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><Train size={12}/> {routes.length} Weekend Trip{routes.length !== 1 ? "s" : ""}</div>
                  {freeRoutes.length > 0 && (
                    <div style={{background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"0.4rem",padding:"0.35rem 0.55rem",marginBottom:"0.35rem",fontSize:"0.68rem",color:"#065F46",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.4rem"}}>
                      <span>🎓 {freeRoutes.length} route{freeRoutes.length!==1?"s":""} included w/ Student Train Pass</span>
                      <a href="https://int.bahn.de/en/faq/deutschlandticket-which-trains" target="_blank" rel="noopener noreferrer" style={{flexShrink:0,fontSize:"0.6rem",color:"#059669",textDecoration:"underline",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Info</a>
                    </div>
                  )}
                  {routes.map((r,i) => {
                    const dest = CITY_COORDS.find(c => c.slug === (r.from === selectedPin.slug ? r.to : r.from));
                    const isFree = isStudentFree(r);
                    return dest ? (
                      <div key={i} onClick={()=>flyToCity(dest.slug)} style={{...S.cpRoute,borderColor:isFree?"#A7F3D0":"#F3F4F6"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"0.3rem",flex:1,minWidth:0}}>
                          <span>{PIN_EMOJI[dest.country]}</span>
                          <span style={{fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{dest.name}</span>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:"0.4rem",flexShrink:0}}>
                          {r.type && <span style={{fontSize:"0.58rem",color:"#6B7280"}}>{r.type}</span>}
                          <span style={{fontSize:"0.68rem",fontWeight:600,color:isFree?"#059669":"#374151"}}>{r.time}</span>
                          <span style={{fontSize:"0.62rem",color:isFree?"#059669":"#6B7280",fontWeight:isFree?600:400}}>{isFree ? "🎓 Free" : r.price}</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              );
            })()}

            <div style={{display:"flex",gap:"0.5rem",marginTop:"1rem"}}>
              <button onClick={()=>navigate("/tips?city="+selectedPin.slug)} style={S.cpPrimary}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(0,33,165,0.35)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 3px 10px rgba(0,33,165,0.25)";}}>
                <Compass size={14}/> Explore</button>
              <button onClick={()=>navigate("/events?city="+encodeURIComponent(selectedPin.name))} style={S.cpSecondary}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.color="#0021A5";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.background="#fff";e.currentTarget.style.color="#374151";}}>
                <Calendar size={14}/> Events</button>
            </div>
          </div>
        )}
      </section>

      {/* YOUR CITIES — daily briefing */}
      {userCities.length > 0 ? (
        <section style={{maxWidth:1200,margin:"0 auto",padding:"2.5rem 2rem 1.5rem"}}>
          {/* Section header */}
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1.75rem"}}>
            <div>
              <p style={{fontSize:"0.68rem",fontWeight:700,color:"#FA4616",textTransform:"uppercase",letterSpacing:"0.1em",margin:"0 0 0.25rem"}}>❖ PERSONALIZED FOR YOU</p>
              <h2 style={{fontSize:"1.5rem",fontWeight:800,color:"#111827",margin:0,lineHeight:1.1}}>Daily Snapshot</h2>
              <p style={{fontSize:"0.82rem",color:"#9CA3AF",margin:"0.25rem 0 0"}}>Your {userCities.length === 1 ? "city" : `${userCities.length} cities`}. Today's snapshot.</p>
            </div>
            <button onClick={()=>{navigate("/tips");setTimeout(()=>window.scrollTo(0,0),50);}} style={{display:"inline-flex",alignItems:"center",gap:"0.35rem",padding:"0.5rem 1.1rem",border:"1.5px solid #E5E7EB",borderRadius:"0.6rem",background:"#fff",cursor:"pointer",fontSize:"0.78rem",fontWeight:600,color:"#374151",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#0021A5";e.currentTarget.style.color="#0021A5";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.color="#374151";}}>              
              <Globe size={13}/> All {TOTAL_CITIES} cities
            </button>
          </div>

          {/* Cards */}
          {(() => {
            const now = new Date();
            const hour = now.getHours();
            const dayIdx = Math.floor(now.getTime() / 86400000);
            const dayOfWeek = now.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayOfWeek];
            const timeEmoji = hour < 5 ? "🌙" : hour < 12 ? "🌤️" : hour < 17 ? "☀️" : hour < 21 ? "🌇" : "🌙";
            const timeLabel = hour < 5 ? "Late Night" : hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 21 ? "Evening" : "Night";

            const WEATHER_POOL = [
              { icon:"☀️", cond:"Clear & sunny",   hi:22, lo:12 },
              { icon:"⛅", cond:"Partly cloudy",   hi:18, lo:10 },
              { icon:"🌥️", cond:"Mostly cloudy",   hi:15, lo:9  },
              { icon:"🌦️", cond:"Light showers",   hi:14, lo:8  },
              { icon:"🌧️", cond:"Rainy day",       hi:11, lo:7  },
              { icon:"🌤️", cond:"Breezy & bright", hi:20, lo:11 },
              { icon:"❄️", cond:"Cold & crisp",    hi:4,  lo:-1 },
              { icon:"🌩️", cond:"Thunderstorms",   hi:17, lo:11 },
            ];

            const DAILY_PHRASES = [
              { de:"Entschuldigung, wo ist die nächste U-Bahn?", en:"Excuse me, where is the nearest subway?",  ctx:"🚇 Getting around" },
              { de:"Einmal Kaffee zum Mitnehmen, bitte.",           en:"One coffee to go, please.",                ctx:"☕ Morning café"   },
              { de:"Haben Sie WLAN hier?",                          en:"Do you have WiFi here?",                   ctx:"📶 Study cafés"    },
              { de:"Was können Sie empfehlen?",                   en:"What do you recommend?",                   ctx:"🍽️ Ordering food"  },
              { de:"Ist dieser Platz noch frei?",                   en:"Is this seat still free?",                 ctx:"📚 Library / café" },
              { de:"Kann ich mit Karte zahlen?",                    en:"Can I pay by card?",                       ctx:"💳 Shopping"       },
              { de:"Darf ich kurz vorbei?",                         en:"May I squeeze past?",                      ctx:"🚌 Crowded transit" },
              { de:"Haben Sie noch etwas Günstigeres?",           en:"Do you have something cheaper?",           ctx:"🛍️ Budgeting"      },
              { de:"Einmal bitte, zum Mitnehmen.",                  en:"One please, to take away.",                ctx:"🥙 Snack run"      },
              { de:"Wie komme ich zum Bahnhof?",                    en:"How do I get to the train station?",       ctx:"🚆 Weekend trips"  },
            ];

            const LOCAL_TIPS = {
              berlin:   ["Sunday brunch at Mauerpark is unmissable — arrive by 11am.", "Museum Island is free the last Thursday of each month after 6pm.", "The U8 runs all night on weekends — no night bus needed."],
              munich:   ["Biergartens let you BYO food — just buy your drink there.", "MVV day tickets are worth it if you're making 3+ trips.", "The English Garden has a real river surfing wave — free to watch."],
              hamburg:  ["Fischmarkt runs 5–9:30am Sundays — go straight from the club.", "Alster lake paddle boats rent for ~€15/hr — great afternoon.", "HVV Proficard saves 20% if you commute regularly."],
              bonn:     ["Free entry to Kunstmuseum every first Thursday of the month.", "Rheinboulevard at sunset is the best free view in the city.", "Rhine ferry from Königswinter is cheap and worth it."],
              vienna:   ["Standing-room opera tickets are €10–15 — queue 80 min before.", "All museums are free for under-26 EU citizens.", "Würstelstand hot dogs at midnight are a Viennese ritual."],
              salzburg: ["Mozart's birthplace is €13 but the fortress view is free.", "Augustinerbräu sells huge mugs of beer for ~€5.", "Bus 25 to Hallstatt runs daily in summer."],
              zurich:   ["Zurich museums are free the first Wednesday of the month.", "Swimming in the Limmat river in summer is completely free.", "The Zurich Card covers all public transit + museums."],
              bern:     ["Swimming in the Aare is Bern's best free summer activity.", "The rose garden above the old town has the best city panorama.", "Einstein's apartment is surprisingly small and surprisingly cool."],
              aachen:   ["Day trip to Maastricht is only 30 min by RE train.", "RWTH student card gets discounts at most cafés and cinemas.", "The Christmas market in December is one of Germany's best."],
              default:  ["Check the local Mensa for the cheapest hot lunch on campus.", "Student ID gets you 20–50% off at museums and cinemas.", "Most cities have free walking tours daily — tip what you can."],
            };

            const TONIGHT_BY_CITY = {
              berlin:   { sunday:"🎼 Philharmonie rush tickets go on sale — check their site", monday:"🎸 Jazz bars in Kreuzberg kick off late, usually no cover", tuesday:"🍺 Prater Biergarten's student night — €3 beers under the chestnut trees", wednesday:"🎭 Volksbühne open rehearsal nights — grab a cheap last-minute ticket", thursday:"🪩 Berghain pre-party vibes start — Thursday is the new Friday in Berlin", friday:"🎉 East Side Gallery is lit at night and totally free — take a walk", saturday:"🌟 Mauerpark amphitheater karaoke at 3pm, then clubs open at midnight" },
              munich:   { sunday:"🍺 Augustiner Keller biergarten golden hour — the best Sunday ritual", monday:"🎵 Nacht der Musik at various venues — student-priced tickets available", tuesday:"� Cinema at Museumslichtspiele does €6 Tuesday nights", wednesday:"🏄 Eisbach river surfers stay late on warm nights — free to watch", thursday:"🍻 Münchner Kindl pre-drinks near LMU before heading to Schwabing", friday:"🎉 English Garden gets buzzing — bring a blanket and Augustiner cans", saturday:"🌟 Oktoberfest tents open at 10am — arrive early or queue for hours" },
              hamburg:  { sunday:"🐟 Fischmarkt ends at 9:30am — go straight from last night or rise early", monday:"🎵 Elbphilharmonie has Monday concerts from €15 — worth every cent", tuesday:"🍸 Strandperle beach bar is the Tuesday local ritual", wednesday:"🎤 Molotow hosts mid-week indie gigs — student door deals before 10pm", thursday:"🎭 Reeperbahn Festival fringe events happen all year — check locally", friday:"� Alster boat bars start up — sunset cruise drinks from the dock", saturday:"🌟 Schanzenviertel wakes up at midnight — bars till 5am" },
              vienna:   { sunday:"🎼 Vienna Boys Choir sings Sunday morning mass — €12 standing room", monday:"☕ Kaffeehäuser are perfect on slow Mondays — read the newspaper like a local", tuesday:"🍷 Heuriger wine taverns open from 4pm — CHF3 Grüner Veltliner", wednesday:"🎵 Volksoper has weekday discount tickets from €8 for students", thursday:"🪩 Gürtel bar street warms up — students spill out of the arches at 11pm", friday:"� Naschmarkt shuts and transforms into a late-night bar district", saturday:"🌟 Donaukanal beach bars are packed — Flex and Motto open till 6am" },
              salzburg: { sunday:"🎼 Mozarteum Sunday matinée — €10 for world-class classical music", monday:"🍺 Augustinerbräu is quiet on Mondays — perfect for a solo evening", tuesday:"🌅 Hohensalzburg fortress is beautiful at sunset — free outside", wednesday:"🎭 Landestheater student tickets go on sale Wednesday morning", thursday:"🍻 Steingasse bars come alive Thursday night — the local student strip", friday:"🎉 Müllner Bräu biergarten fills up fast — get there before 6pm", saturday:"🌟 Old Town Getreidegasse is magical at night — no car traffic, all atmosphere" },
              zurich:   { sunday:"🚴 Zurich's car-free Sunday lakeside walk is the best free thing in the city", monday:"🎵 Tonhalle has last-minute student tickets from CHF12 on Mondays", tuesday:"☕ Conditorei Schober has been serving hot chocolate since 1814 — treat yourself", wednesday:"🎨 Kunsthaus is free the first Wednesday of the month after 5pm", thursday:"🍸 Langstrasse bar crawl — the student budget option before Friday prices kick in", friday:"🎉 Rimini bar on the Limmat lake pier — best Friday evening vibe in the city", saturday:"🌟 Zurich clubs open at 2am — Hive and Zukunft are the spots" },
              bern:     { sunday:"🌊 Aare swim in summer ends with a BBQ at Marzilibad — free and unforgettable", monday:"☕ Einstein Haus is surprisingly interesting on a slow Monday afternoon", tuesday:"🌹 Rosengarten is free and has the best city view — perfect any evening", wednesday:"� Stadttheater student rush tickets go on sale Wednesday at noon", thursday:"🍻 Brasserie Lorraine is the student hangout — cheap beer, great terrace", friday:"🎉 Reitschule cultural center has free Friday events — very Bern", saturday:"🌟 Old Town arcades (Lauben) at night — the medieval street is stunning" },
              graz:     { sunday:"🏰 Schlossberg evening walk is free and the view is spectacular", monday:"🎵 Oper Graz student tickets from €8 — one of Austria's best opera houses", tuesday:"🍺 Puntigamer brewery tours run Tuesday evenings — cheap and fun", wednesday:"🎨 Kunsthaus Graz lights up at night — the alien blobject is actually incredible", thursday:"🍻 Lendplatz bars warm up Thursday — the cool neighbourhood to know", friday:"🎉 Volksgarten starts the weekend — outdoor bar, student prices all night", saturday:"🌟 Schlossberg clock tower at 11pm — the night panorama is one of a kind" },
              aachen:   { sunday:"🏛️ Aachen Cathedral is free and stunning — especially on quiet Sunday mornings", monday:"☕ Pontstraße café hop — every place has student discount Monday deals", tuesday:"🚂 Quick trip to Maastricht — 30 min by RE, Dutch happy hours start at 4pm", wednesday:"🎭 Eurogress cultural events — often student-free entry mid-week", thursday:"🍻 Pontstraße goes off Thursday — the student nightlife strip", friday:"🎉 Elisengarten is the pre-game spot before heading to the clubs", saturday:"🌟 Maastricht market + nightlife — the best cross-border Saturday trip" },
              bonn:     { sunday:"🎼 Beethoven-Haus Sunday concert — intimate chamber music, €12 tickets", monday:"🌊 Rhine promenade evening walk — locals run and cycle here every night", tuesday:"🍺 Biergarten am Rhein gets the sunset crowd on clear evenings", wednesday:"🎭 Oper Bonn student tickets from €7 — midweek deals are the best", thursday:"� Markt square bars fill up Thursday — the pre-weekend ritual", friday:"🎉 Kennedy Ufer riverside bars open — the student stretch along the Rhine", saturday:"🌟 Day trip to Cologne is only 20 min by S-Bahn — back for a late Bonn night" },
              default:  { sunday:"🎼 Check local church or concert halls for free Sunday performances", monday:"☕ Find the university Mensa café — often open evenings too", tuesday:"🍺 Tuesday is cheapest bar night across Germany and Austria", wednesday:"🎭 Mid-week theatre and concert rush tickets are usually half price", thursday:"🪩 Thursday is the student night out in most German university towns", friday:"🎉 The weekend starts tonight — check local social media for what's on", saturday:"🌟 Prime night out — every venue has something on" },
            };
            const tonightMap = TONIGHT_BY_CITY;

            // Bookmark helpers for daily phrases
            const getDailyBookmarks = () => {
              try { return JSON.parse(localStorage.getItem("dailyPhraseBookmarks") || "[]"); } catch { return []; }
            };
            const toggleDailyBookmark = (phrase) => {
              const prev = getDailyBookmarks();
              const exists = prev.some(p => p.de === phrase.de);
              const next = exists ? prev.filter(p => p.de !== phrase.de) : [...prev, phrase];
              localStorage.setItem("dailyPhraseBookmarks", JSON.stringify(next));
              setUserData(prev => ({...prev})); // force re-render
            };
            const isDailyBookmarked = (de) => getDailyBookmarks().some(p => p.de === de);

            // Sort: primary city first
            const sortedCities = [...userCities].sort((a, b) => {
              const aP = a === userCityData?.slug ? -1 : 0;
              const bP = b === userCityData?.slug ? -1 : 0;
              return aP - bP;
            });

            return (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1.25rem"}}>
                {sortedCities.map((slug, cardIdx) => {
                  const pin = CITY_COORDS.find(c => c.slug === slug);
                  if (!pin) return null;

                  const seed = (dayIdx * 7 + pin.name.length * 3 + cardIdx) % WEATHER_POOL.length;
                  const weather = WEATHER_POOL[seed];
                  const phrase = DAILY_PHRASES[(dayIdx + pin.name.charCodeAt(0)) % DAILY_PHRASES.length];
                  const tips = LOCAL_TIPS[slug] || LOCAL_TIPS.default;
                  const tip = tips[(dayIdx + cardIdx) % tips.length];
                  const isPrimary = pin.slug === userCityData?.slug;
                  const cityTonight = tonightMap[slug] || tonightMap.default;
                  const tonightTip = cityTonight[dayName.toLowerCase()] || "🌙 Good night for a walk along the river";
                  const hdrGradient = isPrimary
                    ? "linear-gradient(135deg,#FA4616 0%,#c73800 100%)"
                    : "linear-gradient(135deg,#0021A5 0%,#003087 100%)";

                  return (
                    <div key={slug} style={{borderRadius:"1.25rem",overflow:"hidden",boxShadow:isPrimary?"0 6px 28px rgba(250,70,22,0.12)":"0 4px 20px rgba(0,0,0,0.07)",border:isPrimary?"1.5px solid #FDBA74":"1px solid #E5E7EB",background:"#fff",transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",gridColumn:isPrimary&&userCities.length>1?"1 / -1":"auto"}}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=isPrimary?"0 16px 48px rgba(250,70,22,0.15)":"0 16px 48px rgba(0,33,165,0.13)";}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=isPrimary?"0 6px 28px rgba(250,70,22,0.12)":"0 4px 20px rgba(0,0,0,0.07)";}}>

                      {/* Header — compact */}
                      <div style={{background:hdrGradient,padding:isPrimary?"1.1rem 1.35rem":"0.85rem 1.15rem",position:"relative",overflow:"hidden"}}>
                        <div style={{position:"absolute",top:"-40%",right:"-15%",width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"}}/>
                        <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                            {isPrimary && <span style={{fontSize:"0.5rem",fontWeight:800,background:"rgba(255,255,255,0.25)",color:"#fff",padding:"0.12rem 0.5rem",borderRadius:9999,letterSpacing:"0.08em",border:"1px solid rgba(255,255,255,0.35)"}}>❖ YOUR CITY</span>}
                            <span style={{fontSize:isPrimary?"1.7rem":"1.3rem",lineHeight:1}}>{PIN_EMOJI[pin.country]}</span>
                            <h3 style={{fontSize:isPrimary?"1.45rem":"0.95rem",fontWeight:800,color:"#fff",margin:0,letterSpacing:"-0.02em"}}>{pin.name}</h3>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:"0.5rem",background:"rgba(255,255,255,0.1)",borderRadius:"0.55rem",padding:isPrimary?"0.4rem 0.75rem":"0.3rem 0.6rem",border:"1px solid rgba(255,255,255,0.08)"}}>
                            <span style={{fontSize:isPrimary?"1.2rem":"0.95rem"}}>{weather.icon}</span>
                            <div style={{textAlign:"right"}}>
                              <p style={{fontSize:isPrimary?"0.95rem":"0.78rem",fontWeight:800,color:"#fff",margin:0,lineHeight:1}}>{weather.hi}°</p>
                              <p style={{fontSize:isPrimary?"0.6rem":"0.5rem",color:"rgba(255,255,255,0.5)",margin:0}}>{weather.cond}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      {isPrimary ? (
                        /* ===== PRIMARY CITY — full detail with bookmark ===== */
                        <div style={{padding:"1rem 1.25rem",display:"grid",gridTemplateColumns:userCities.length>1?"1fr 1fr":"1fr",gap:"0.75rem"}}>
                          {/* Phrase of the day with bookmark + listen */}
                          <div style={{background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)",borderRadius:"0.85rem",padding:"0.85rem 1rem",border:"1px solid #BFDBFE",transition:"all 0.2s",gridColumn:userCities.length>1?"1 / 2":"auto"}}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor="#93C5FD";}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor="#BFDBFE";}}>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.4rem"}}>
                              <span style={{fontSize:"0.58rem",fontWeight:700,color:"#0021A5",textTransform:"uppercase",letterSpacing:"0.08em"}}>💬 Street-Ready German</span>
                              <div style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
                                <button onClick={(e)=>{e.stopPropagation();toggleDailyBookmark(phrase);}} title={isDailyBookmarked(phrase.de)?"Remove bookmark":"Bookmark"} style={{background:isDailyBookmarked(phrase.de)?"#FFF7ED":"#fff",border:isDailyBookmarked(phrase.de)?"1px solid #FA4616":"1px solid #BFDBFE",borderRadius:"0.35rem",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s",padding:0}}>
                                  <Bookmark size={11} fill={isDailyBookmarked(phrase.de)?"#FA4616":"none"} color={isDailyBookmarked(phrase.de)?"#FA4616":"#0021A5"}/>
                                </button>
                                <button onClick={()=>{if(typeof speechSynthesis!=="undefined"){const u=new SpeechSynthesisUtterance(phrase.de);u.lang="de-DE";u.rate=0.85;speechSynthesis.speak(u);}}} style={{background:"#fff",border:"1px solid #BFDBFE",borderRadius:"0.35rem",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s",padding:0}}>
                                  <Volume2 size={11} color="#0021A5"/>
                                </button>
                              </div>
                            </div>
                            <p style={{fontSize:"0.92rem",fontWeight:800,color:"#0021A5",margin:"0 0 0.2rem",lineHeight:1.3}}>{phrase.de}</p>
                            <p style={{fontSize:"0.73rem",color:"#374151",margin:"0 0 0.3rem"}}>{phrase.en}</p>
                            <span style={{fontSize:"0.58rem",fontWeight:600,color:"#003087",background:"rgba(0,33,165,0.08)",padding:"0.1rem 0.45rem",borderRadius:9999}}>{phrase.ctx}</span>
                          </div>

                          {/* Tonight */}
                          <div style={{display:"flex",alignItems:"flex-start",gap:"0.6rem",background:"#FFF7F5",borderRadius:"0.85rem",padding:"0.75rem 0.9rem",border:"1px solid #FECDC2",gridColumn:userCities.length>1?"2 / 3":"auto"}}>
                            <div style={{width:28,height:28,borderRadius:"0.45rem",background:"linear-gradient(135deg,#FA4616,#c73800)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.85rem"}}>
                              {isWeekend ? "🎉" : "🌆"}
                            </div>
                            <div style={{flex:1,minWidth:0}}>
                              <p style={{fontSize:"0.58rem",fontWeight:700,color:"#c73800",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.15rem"}}>Tonight · {dayName}</p>
                              <p style={{fontSize:"0.75rem",color:"#7C2D12",margin:0,lineHeight:1.4,fontWeight:500}}>{tonightTip}</p>
                            </div>
                          </div>

                          {/* Local tip */}
                          <div style={{display:"flex",alignItems:"flex-start",gap:"0.6rem",background:"#F5F8FF",borderRadius:"0.85rem",padding:"0.75rem 0.9rem",border:"1px solid #C7D7F8"}}>
                            <div style={{width:28,height:28,borderRadius:"0.45rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.85rem"}}>💡</div>
                            <div style={{flex:1,minWidth:0}}>
                              <p style={{fontSize:"0.58rem",fontWeight:700,color:"#0021A5",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.15rem"}}>Local tip</p>
                              <p style={{fontSize:"0.75rem",color:"#1e3a8a",margin:0,lineHeight:1.4,fontWeight:500}}>{tip}</p>
                            </div>
                          </div>

                          {/* Sunset / Sunrise */}
                          {(() => {
                            const sunsetHours = [16,16,17,18,20,21,21,20,19,18,16,16];
                            const sunriseHours = [8,7,7,6,5,5,5,6,7,7,7,8];
                            const mo = now.getMonth();
                            return (
                              <div style={{display:"flex",alignItems:"flex-start",gap:"0.6rem",background:"linear-gradient(135deg,#FFF8ED,#FFFBE8)",borderRadius:"0.85rem",padding:"0.75rem 0.9rem",border:"1px solid #FDEAB8"}}>
                                <div style={{width:28,height:28,borderRadius:"0.45rem",background:"linear-gradient(135deg,#F59E0B,#D97706)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.85rem"}}>🌅</div>
                                <div style={{flex:1,minWidth:0}}>
                                  <p style={{fontSize:"0.58rem",fontWeight:700,color:"#92400E",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.15rem"}}>Daylight</p>
                                  <p style={{fontSize:"0.75rem",color:"#78350F",margin:0,lineHeight:1.4,fontWeight:500}}>☀️ Sunrise ~{sunriseHours[mo]}:{String((dayIdx*17)%60).padStart(2,"0")}am &nbsp;·&nbsp; 🌇 Sunset ~{sunsetHours[mo]}:{String((dayIdx*23)%60).padStart(2,"0")}pm</p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Days until next German holiday */}
                          {(() => {
                            const holidays = [
                              {name:"New Year's Day",m:0,d:1},{name:"Epiphany",m:0,d:6},{name:"May Day",m:4,d:1},{name:"German Unity Day",m:9,d:3},{name:"All Saints' Day",m:10,d:1},{name:"Christmas Eve",m:11,d:24},{name:"Christmas Day",m:11,d:25},{name:"New Year's Eve",m:11,d:31}
                            ];
                            let next=null;let daysUntil=999;
                            holidays.forEach(h=>{
                              let hDate=new Date(now.getFullYear(),h.m,h.d);
                              if(hDate<now) hDate=new Date(now.getFullYear()+1,h.m,h.d);
                              const diff=Math.ceil((hDate-now)/(1000*60*60*24));
                              if(diff<daysUntil){daysUntil=diff;next=h;}
                            });
                            return (
                              <div style={{display:"flex",alignItems:"flex-start",gap:"0.6rem",background:"linear-gradient(135deg,#F0FFF4,#ECFDF5)",borderRadius:"0.85rem",padding:"0.75rem 0.9rem",border:"1px solid #A7F3D0"}}>
                                <div style={{width:28,height:28,borderRadius:"0.45rem",background:"linear-gradient(135deg,#10B981,#059669)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.85rem"}}>🗓️</div>
                                <div style={{flex:1,minWidth:0}}>
                                  <p style={{fontSize:"0.58rem",fontWeight:700,color:"#065F46",textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 0.15rem"}}>Next Holiday</p>
                                  <p style={{fontSize:"0.75rem",color:"#064E3B",margin:0,lineHeight:1.4,fontWeight:500}}>🎉 {next?.name} in <strong>{daysUntil}</strong> day{daysUntil!==1?"s":""}</p>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        /* ===== SECONDARY CITY — compact ===== */
                        <div style={{padding:"0.85rem 1.1rem",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
                          {/* Tonight — main highlight */}
                          <div style={{display:"flex",alignItems:"flex-start",gap:"0.55rem"}}>
                            <div style={{width:26,height:26,borderRadius:"0.4rem",background:"linear-gradient(135deg,#FA4616,#c73800)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.78rem"}}>{isWeekend?"🎉":"🌆"}</div>
                            <div style={{flex:1,minWidth:0}}>
                              <p style={{fontSize:"0.55rem",fontWeight:700,color:"#c73800",textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 0.1rem"}}>Tonight</p>
                              <p style={{fontSize:"0.72rem",color:"#7C2D12",margin:0,lineHeight:1.35,fontWeight:500}}>{tonightTip}</p>
                            </div>
                          </div>
                          {/* Quick tip */}
                          <div style={{display:"flex",alignItems:"flex-start",gap:"0.55rem"}}>
                            <div style={{width:26,height:26,borderRadius:"0.4rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.78rem"}}>💡</div>
                            <div style={{flex:1,minWidth:0}}>
                              <p style={{fontSize:"0.55rem",fontWeight:700,color:"#0021A5",textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 0.1rem"}}>Quick tip</p>
                              <p style={{fontSize:"0.72rem",color:"#1e3a8a",margin:0,lineHeight:1.35,fontWeight:500}}>{tip}</p>
                            </div>
                          </div>
                          {/* Mensa budget tip */}
                          <div style={{display:"flex",alignItems:"flex-start",gap:"0.55rem"}}>
                            <div style={{width:26,height:26,borderRadius:"0.4rem",background:"linear-gradient(135deg,#10B981,#059669)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.78rem"}}>🍽️</div>
                            <div style={{flex:1,minWidth:0}}>
                              <p style={{fontSize:"0.55rem",fontWeight:700,color:"#065F46",textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 0.1rem"}}>Budget bite</p>
                              <p style={{fontSize:"0.72rem",color:"#064E3B",margin:0,lineHeight:1.35,fontWeight:500}}>{["Mensa lunch averages €3.50 — cheapest hot meal in town","Bakery Brötchen before 8am are usually €0.40–€0.80","Lidl/Aldi meal deals beat any takeout — check the weekly flyer","Döner kebab is the student staple — €4–6 for a filling meal","Cooking at home? Aldi has full meals under €2 per portion"][(dayIdx + pin.name.length) % 5]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </section>
      ) : userName ? (
        <section style={{maxWidth:1200,margin:"0 auto",padding:"2.5rem 2rem 1.5rem"}}>
          <div style={{background:"#fff",borderRadius:"1rem",border:"1px solid #E5E7EB",padding:"2.5rem",textAlign:"center"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}><MapPin size={24} color="#0021A5"/></div>
            <h3 style={{fontSize:"1.2rem",fontWeight:700,color:"#111827",margin:"0 0 0.4rem"}}>Save cities to personalize your experience</h3>
            <p style={{fontSize:"0.88rem",color:"#6B7280",maxWidth:420,margin:"0 auto 1.25rem",lineHeight:1.55}}>Head to Explore, pick the cities you're studying in or want to visit, and they'll show up here as your personal hub.</p>
            <button onClick={() => navigate("/tips")} style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.7rem 1.5rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",cursor:"pointer",fontSize:"0.88rem",fontWeight:700,boxShadow:"0 3px 12px rgba(0,33,165,0.2)"}}><Compass size={15}/> Browse Cities</button>
          </div>
        </section>
      ) : null}

      {/* CITY PICKER MODAL — shown for new users with no saved cities */}
      {showCityPicker && (
        <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",animation:"slideUp 0.3s ease-out"}}>
          <div style={{background:"#fff",borderRadius:"1.25rem",width:"90%",maxWidth:560,maxHeight:"80vh",overflow:"hidden",boxShadow:"0 25px 60px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"1.75rem 2rem 1rem",borderBottom:"1px solid #F3F4F6"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem"}}>
                <div style={{width:40,height:40,borderRadius:"0.75rem",background:"linear-gradient(135deg,#0021A5,#003087)",display:"flex",alignItems:"center",justifyContent:"center"}}><MapPin size={20} color="#fff"/></div>
                <div>
                  <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#111827",margin:0}}>Where are you studying abroad?</h2>
                  <p style={{fontSize:"0.82rem",color:"#6B7280",margin:0}}>Pick your cities to personalize your experience</p>
                </div>
              </div>
            </div>
            <div style={{padding:"1rem 2rem",overflowY:"auto",flex:1}}>
              {["DE","AT","CH"].map(code => {
                const countryCities = CITY_COORDS.filter(c => c.country === code);
                return (
                  <div key={code} style={{marginBottom:"1rem"}}>
                    <div style={{fontSize:"0.72rem",fontWeight:700,color:"#6B7280",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.06em"}}>{PIN_EMOJI[code]} {COUNTRY_LABELS[code]}</div>
                    <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                      {countryCities.map(city => {
                        const selected = pickerSelected.includes(city.slug);
                        return (
                          <button key={city.slug} onClick={() => setPickerSelected(prev => selected ? prev.filter(s=>s!==city.slug) : [...prev, city.slug])}
                            style={{
                              padding:"0.4rem 0.85rem",borderRadius:9999,fontSize:"0.78rem",fontWeight:600,cursor:"pointer",transition:"all 0.15s",
                              background: selected ? "linear-gradient(135deg,#0021A5,#003087)" : "#F9FAFB",
                              color: selected ? "#fff" : "#374151",
                              border: selected ? "1.5px solid #0021A5" : "1.5px solid #E5E7EB",
                              boxShadow: selected ? "0 2px 8px rgba(0,33,165,0.2)" : "none",
                            }}>
                            {selected ? "✓ " : ""}{city.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{padding:"1rem 2rem 1.5rem",borderTop:"1px solid #F3F4F6",display:"flex",gap:"0.75rem",justifyContent:"flex-end",alignItems:"center"}}>
              <span style={{fontSize:"0.78rem",color:"#6B7280",flex:1}}>{pickerSelected.length > 0 ? `${pickerSelected.length} selected` : "Select at least one city"}</span>
              <button onClick={() => { setShowCityPicker(false); localStorage.setItem("cityPickerDismissed","true"); }} style={{padding:"0.55rem 1.2rem",border:"1px solid #E5E7EB",borderRadius:"0.6rem",background:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,color:"#6B7280"}}>Skip</button>
              <button onClick={() => {
                if (pickerSelected.length > 0) {
                  localStorage.setItem("myCities", JSON.stringify(pickerSelected));
                  localStorage.setItem("cityPickerDismissed","true");
                  setShowCityPicker(false);
                  setUserData(readUserData());
                }
              }} disabled={pickerSelected.length === 0} style={{
                padding:"0.55rem 1.5rem",border:"none",borderRadius:"0.6rem",
                background: pickerSelected.length > 0 ? "linear-gradient(135deg,#FA4616,#FF6B35)" : "#E5E7EB",
                color: pickerSelected.length > 0 ? "#fff" : "#9CA3AF",
                cursor: pickerSelected.length > 0 ? "pointer" : "not-allowed",
                fontSize:"0.82rem",fontWeight:700,boxShadow: pickerSelected.length > 0 ? "0 3px 12px rgba(250,70,22,0.3)" : "none",
              }}><Compass size={14}/> Let's Go!</button>
            </div>
          </div>
        </div>
      )}

      <footer style={S.foot}><p style={{margin:0}}>&copy; 2026 MyTranslationBuddy &mdash; Built by Gators, for Gators {"\uD83D\uDC0A"}</p><p style={{margin:"0.35rem 0 0",fontSize:"0.68rem",color:"#D1D5DB"}}>{TOTAL_CITIES} cities · 3 countries · 1 semester to explore them all</p></footer>
    </div>
  );
};

/* STYLES */
const S = {
  page:{minHeight:"100vh",backgroundColor:"#F9FAFB",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"},
  hdr:{backgroundColor:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid rgba(229,231,235,0.5)",position:"sticky",top:0,zIndex:1000,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  hdrIn:{maxWidth:1200,margin:"0 auto",padding:"0.5rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center"},
  hdrL:{display:"flex",alignItems:"center",gap:"0.6rem",cursor:"pointer"},
  brand:{fontSize:"1.05rem",fontWeight:800,color:"#0021A5",letterSpacing:"-0.01em"},
  nav:{display:"flex",gap:"0.15rem",alignItems:"center",flexWrap:"wrap",background:"#F3F4F6",borderRadius:"0.65rem",padding:"0.2rem"},
  nb:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 0.85rem",border:"none",borderRadius:"0.5rem",backgroundColor:"transparent",color:"#6B7280",cursor:"pointer",fontSize:"0.78rem",fontWeight:500,transition:"all 0.2s"},
  nbActive:{backgroundColor:"#fff",color:"#0021A5",boxShadow:"0 1px 3px rgba(0,0,0,0.08)",fontWeight:700},
  nbA:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.45rem 1.1rem",border:"none",borderRadius:"0.5rem",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.02em",boxShadow:"0 2px 8px rgba(250,70,22,0.25)",marginLeft:"0.35rem"},
  hero:{background:"linear-gradient(160deg,#0a0a1a 0%,#0021A5 40%,#003087 70%,#1a1a2e 100%)",padding:"5rem 2rem 4rem",textAlign:"center",overflow:"hidden",position:"relative"},
  heroIn:{maxWidth:720,margin:"0 auto",position:"relative",zIndex:1},
  heroT:{fontSize:"2.8rem",fontWeight:800,color:"#fff",margin:"0 0 1rem 0",lineHeight:1.15,letterSpacing:"-0.03em"},
  heroHL:{background:"linear-gradient(90deg,#FA4616,#FFB347)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  heroSub:{fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",margin:"0 auto 2.5rem",lineHeight:1.65,maxWidth:540},
  heroActs:{display:"flex",gap:"0.6rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"2.5rem"},
  heroP:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.85rem 2rem",borderRadius:"0.75rem",border:"none",background:"linear-gradient(135deg,#FA4616,#FF6B35)",color:"#fff",cursor:"pointer",fontSize:"0.95rem",fontWeight:700,boxShadow:"0 4px 20px rgba(250,70,22,0.4)",transition:"all 0.25s ease"},
  heroO:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.85rem 1.5rem",borderRadius:"0.75rem",border:"1.5px solid rgba(255,255,255,0.25)",backgroundColor:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.9)",cursor:"pointer",fontSize:"0.95rem",fontWeight:600,backdropFilter:"blur(4px)",transition:"all 0.25s ease"},
  countryRow:{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"},
  countryPill:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 1.2rem",borderRadius:"1rem",backgroundColor:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",cursor:"pointer",transition:"all 0.2s",backdropFilter:"blur(4px)"},
  picksWrap:{maxWidth:1200,margin:"-2rem auto 0",padding:"0 2rem",position:"relative",zIndex:2},
  picksScroll:{display:"flex",gap:"0.75rem",overflowX:"auto",paddingBottom:"0.75rem"},
  pickCard:{display:"flex",alignItems:"center",gap:"0.75rem",padding:"1rem 1.25rem",backgroundColor:"#fff",borderRadius:"1rem",border:"1px solid #E5E7EB",boxShadow:"0 4px 20px rgba(0,0,0,0.06)",cursor:"pointer",minWidth:220,transition:"all 0.25s ease",flexShrink:0},
  mapSection:{position:"relative",margin:"2rem 0 0"},
  mapToolbar:{position:"absolute",top:"1rem",left:"1rem",right:"auto",display:"flex",alignItems:"center",gap:"0.4rem",zIndex:500,padding:"0.5rem 0.65rem",backgroundColor:"rgba(255,255,255,0.92)",backdropFilter:"blur(16px)",borderRadius:"0.85rem",border:"1px solid rgba(229,231,235,0.6)",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"},
  mapSearchWrap:{position:"relative",display:"flex",alignItems:"center",gap:"0.35rem",padding:"0.35rem 0.65rem",border:"1px solid #E5E7EB",borderRadius:"0.5rem",backgroundColor:"rgba(249,250,251,0.8)",minWidth:160},
  mapSearchInput:{border:"none",outline:"none",fontSize:"0.78rem",backgroundColor:"transparent",width:110,color:"#374151"},
  mapSearchDrop:{position:"absolute",top:"100%",left:0,right:0,marginTop:4,backgroundColor:"#fff",border:"1px solid #E5E7EB",borderRadius:"0.6rem",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:100,overflow:"hidden"},
  mapSearchItem:{padding:"0.5rem 0.75rem",fontSize:"0.82rem",cursor:"pointer",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",gap:"0.4rem",color:"#374151",fontWeight:500,transition:"background 0.15s ease"},
  flyBtns:{display:"flex",gap:"0.25rem"},
  flyBtn:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem",padding:"0.35rem 0.55rem",border:"1px solid #E5E7EB",borderRadius:"0.5rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.75rem",fontWeight:600,color:"#374151",transition:"all 0.2s ease",whiteSpace:"nowrap"},
  routeToggle:{display:"flex",alignItems:"center",gap:"0.3rem",padding:"0.35rem 0.65rem",border:"1.5px solid #E5E7EB",borderRadius:"0.5rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.75rem",fontWeight:600,color:"#374151",transition:"all 0.2s ease",whiteSpace:"nowrap"},
  mapLegend:{position:"absolute",bottom:"1rem",left:"1rem",display:"flex",gap:"0.6rem",zIndex:500,padding:"0.4rem 0.65rem",backgroundColor:"rgba(255,255,255,0.88)",backdropFilter:"blur(12px)",borderRadius:"0.6rem",border:"1px solid rgba(229,231,235,0.5)",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"},
  legI:{display:"flex",alignItems:"center",gap:"0.25rem",fontSize:"0.68rem",color:"#374151",fontWeight:500},
  legD:{width:9,height:9,borderRadius:"50%",display:"inline-block"},
  mapW:{width:"100%",height:"80vh",minHeight:600,zIndex:1},
  cityPanel:{position:"absolute",top:"1rem",right:"1rem",width:320,maxHeight:"calc(100% - 2rem)",overflowY:"auto",backgroundColor:"rgba(255,255,255,0.97)",backdropFilter:"blur(16px)",borderRadius:"1rem",border:"1px solid #E5E7EB",boxShadow:"0 16px 48px rgba(0,0,0,0.18)",padding:"1.25rem",zIndex:500,animation:"slideUp 0.3s ease-out"},
  cityPanelX:{position:"absolute",top:"0.6rem",right:"0.6rem",background:"#F3F4F6",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6B7280",transition:"all 0.15s"},
  cpRow:{display:"flex",alignItems:"center",gap:"0.35rem",marginBottom:"0.5rem"},
  cpVibe:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.75rem",color:"#6B7280",marginBottom:"0.6rem",padding:"0.35rem 0.6rem",backgroundColor:"#F9FAFB",borderRadius:"0.5rem",border:"1px solid #F3F4F6"},
  cpStats:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",marginBottom:"0.75rem"},
  cpStat:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.72rem",color:"#374151",fontWeight:500,padding:"0.35rem 0.5rem",backgroundColor:"#F9FAFB",borderRadius:"0.4rem",border:"1px solid #F3F4F6"},
  cpMustDo:{display:"flex",alignItems:"flex-start",gap:"0.3rem",fontSize:"0.75rem",color:"#065F46",fontWeight:500,backgroundColor:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"0.5rem",padding:"0.5rem 0.65rem",lineHeight:1.4},
  cpRoute:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.35rem 0.55rem",backgroundColor:"#F9FAFB",borderRadius:"0.4rem",fontSize:"0.75rem",fontWeight:500,color:"#374151",cursor:"pointer",marginBottom:"0.3rem",border:"1px solid #F3F4F6",transition:"all 0.15s ease"},
  cpPrimary:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.35rem",padding:"0.6rem",border:"none",borderRadius:"0.6rem",background:"linear-gradient(135deg,#0021A5,#003087)",color:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:700,boxShadow:"0 3px 10px rgba(0,33,165,0.25)",transition:"all 0.2s ease"},
  cpSecondary:{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.35rem",padding:"0.6rem 0.85rem",border:"1.5px solid #E5E7EB",borderRadius:"0.6rem",backgroundColor:"#fff",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,color:"#374151",transition:"all 0.2s ease"},
  fp:{position:"fixed",bottom:"1.5rem",right:"1.5rem",width:370,maxHeight:"82vh",overflowY:"auto",backgroundColor:"#fff",borderRadius:"1.25rem",border:"1px solid #E5E7EB",boxShadow:"0 20px 60px rgba(0,0,0,0.15),0 0 0 1px rgba(0,0,0,0.02)",padding:"1.5rem",zIndex:999,animation:"slideUp 0.4s ease-out"},
  fpX:{position:"absolute",top:"0.75rem",right:"0.75rem",background:"#F3F4F6",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#6B7280"},
  fpHdr:{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.85rem"},
  fpSpk:{width:40,height:40,borderRadius:"0.75rem",backgroundColor:"#FFF7ED",border:"1px solid #FED7AA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  fpLbl:{fontSize:"0.62rem",fontWeight:700,color:"#92400E",letterSpacing:"0.1em",display:"block"},
  fpCat:{fontSize:"0.68rem",fontWeight:600,color:"#6B7280",textTransform:"capitalize"},
  fpDE:{fontSize:"1.35rem",fontWeight:800,color:"#0021A5",margin:"0 0 0.6rem 0",lineHeight:1.3},
  fpActs:{display:"flex",alignItems:"center",gap:"0.45rem",marginBottom:"0.6rem",flexWrap:"wrap"},
  fpAB:{display:"inline-flex",alignItems:"center",gap:"0.3rem",fontSize:"0.78rem",fontWeight:600,color:"#0021A5",padding:"0.4rem 0.85rem",borderRadius:"0.5rem",border:"1.5px solid #0021A5",backgroundColor:"#EFF6FF",cursor:"pointer",transition:"all 0.2s"},
  fpPB:{display:"inline-flex",alignItems:"center",fontSize:"0.75rem",color:"#6B7280",padding:"0.35rem 0.65rem",borderRadius:"0.5rem",border:"1px solid #E5E7EB",backgroundColor:"#F9FAFB",cursor:"pointer",fontStyle:"italic",transition:"all 0.15s"},
  fpEN:{display:"flex",alignItems:"center",gap:"0.35rem",fontSize:"0.95rem",color:"#374151",margin:"0 0 0.5rem 0",fontWeight:600},
  fpCtx:{display:"flex",alignItems:"flex-start",gap:"0.4rem",padding:"0.55rem 0.75rem",backgroundColor:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:"0.5rem",marginBottom:"0.6rem",fontSize:"0.78rem",color:"#78350F",lineHeight:1.45,fontWeight:500},
  fpReg:{backgroundColor:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:"0.5rem",padding:"0.6rem 0.75rem",marginBottom:"0.6rem"},
  fpRH:{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"0.72rem",fontWeight:600,color:"#374151",marginBottom:"0.4rem"},
  fpPills:{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.3rem"},
  fpPill:{fontSize:"0.68rem",fontWeight:600,color:"#374151",backgroundColor:"#fff",border:"1px solid #D1D5DB",padding:"0.2rem 0.5rem",borderRadius:9999,cursor:"pointer",transition:"all 0.15s"},
  fpTags:{display:"flex",gap:"0.3rem",flexWrap:"wrap",marginBottom:"0.5rem"},
  fpTg:{display:"inline-flex",alignItems:"center",gap:"0.15rem",fontSize:"0.62rem",fontWeight:600,backgroundColor:"#FEF3C7",color:"#92400E",padding:"0.18rem 0.45rem",borderRadius:9999,textTransform:"capitalize"},
  fpEx:{fontSize:"0.75rem",color:"#4B5563",fontStyle:"italic",margin:"0 0 0.5rem 0",lineHeight:1.45,paddingLeft:"0.5rem",borderLeft:"3px solid #DBEAFE"},
  fpBr:{display:"inline-flex",alignItems:"center",gap:"0.3rem",fontSize:"0.75rem",fontWeight:600,color:"#0021A5",border:"1px solid #BFDBFE",backgroundColor:"#EFF6FF",cursor:"pointer",padding:"0.4rem 0.85rem",borderRadius:"0.5rem",transition:"all 0.15s",width:"100%",justifyContent:"center"},
  fpTog:{position:"fixed",bottom:"1.5rem",right:"1.5rem",zIndex:999,display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.7rem 1.25rem",borderRadius:9999,border:"1px solid #FED7AA",backgroundColor:"#FFF7ED",cursor:"pointer",fontSize:"0.82rem",fontWeight:600,color:"#92400E",boxShadow:"0 4px 20px rgba(0,0,0,0.12)",animation:"slideUp 0.3s ease-out"},
  sec:{maxWidth:1200,margin:"0 auto",padding:"3rem 2rem"},
  cBlock:{marginBottom:"2rem"},
  cHead:{display:"flex",justifyContent:"space-between",alignItems:"baseline",paddingBottom:"0.6rem",borderBottom:"2px solid #DBEAFE",marginBottom:"1rem"},
  cTi:{fontSize:"1.12rem",fontWeight:600,color:"#0021A5",margin:0},
  cCount:{fontSize:"0.82rem",fontWeight:400,color:"#6B7280"},
  cGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:"1rem"},
  cCard:{backgroundColor:"#fff",padding:"1.1rem",borderRadius:"0.75rem",border:"1px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},
  cCardH:{borderColor:"#0021A5",boxShadow:"0 4px 16px rgba(0,33,165,0.12)",transform:"translateY(-2px)"},
  cCardTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.25rem"},
  cName:{fontSize:"1rem",fontWeight:600,color:"#111827",margin:0},
  dBadge:{display:"inline-block",fontSize:"0.66rem",fontWeight:600,backgroundColor:"#EEF2FF",color:"#4338CA",padding:"0.15rem 0.5rem",borderRadius:9999,marginBottom:"0.35rem"},
  cUni:{fontSize:"0.72rem",fontWeight:600,color:"#0021A5",margin:"0 0 0.3rem 0"},
  cTag:{fontSize:"0.8rem",color:"#6B7280",margin:"0 0 0.6rem 0",lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},
  mBadge:{fontSize:"0.66rem",fontWeight:600,padding:"0.18rem 0.5rem",borderRadius:"0.35rem"},
  foot:{textAlign:"center",padding:"2.5rem 2rem",color:"#9CA3AF",fontSize:"0.78rem",borderTop:"1px solid #E5E7EB",background:"#FAFBFC",letterSpacing:"0.01em"},
};

export default LandingPage;