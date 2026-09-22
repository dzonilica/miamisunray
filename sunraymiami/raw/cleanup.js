const fs=require('fs');
// Wix stock: prefiks 11062b_ (Wix stock biblioteka) i goli hex (stariji Wix stock format)
const wixStock=[
 ['assets/hero/modern-style-pool-villa.jpeg','11062b_b38271d78c50469db06a7e0adc05e373~mv2.jpeg'],
 ['assets/hero/aerial-patio-view.jpg','d7f019a0e0ef4cfb83f63dab7b09ecfe.jpg'],
 ['assets/logo/icon-instagram-200.png','81af6121f84c41a5b4391d7d37fce12a.png'],
 ['assets/services/impact-doors-windows-hallway.jpeg','11062b_51909333fe5d4c52a275479484b8fae0~mv2.jpeg'],
 ['assets/services/solar-panels.jpg','11062b_b6d84e456b944dc9a0af286496c80a2f~mv2.jpg'],
 ['assets/services/demolition-bulldozer.jpg','d55c98a6943b4bfca1aa29b521b22092.jpg'],
 ['assets/services/pool-house.jpg','11062b_bbe8c1c80d7746379a4e00c8ec611199~mv2.jpg'],
 ['assets/services/painting-paint-roll.jpg','11062b_a792f2aac2a348cba548294b8bad64f2~mv2.jpg'],
 ['assets/services/landscaping-tropical-garden.jpg','11062b_9b2d4c1a100b42b29c1a980348327254~mv2.jpg'],
 ['assets/services/driveway-modern-garage.jpg','93329f34d0d44f7b8c3b2234ff583a8d.jpg'],
 ['assets/services/air-conditioning-thermostat.jpg','7e4a1c05c6e040f28df61a4686e5eff9.jpg'],
 ['assets/services/additions-wooden-framing.jpg','a177809f319d47258186bcf5532bb5ba.jpg'],
 ['assets/services/ducts-air-filter.jpg','62adbcec8fc243d0b710789bb01af4a1.jpg'],
 ['assets/services/commercial-buildouts-awning.jpeg','11062b_9f5384515841448e87d7adc49e1bbfee~mv2.jpeg'],
 ['assets/services/permits-engineering-architect.jpg','11062b_45f9d2ba637e437eabf7eeae2cb05d58~mv2.jpg'],
];
let freed=0,n=0;
for(const [a,orig] of wixStock){
  for(const p of [a,'images/'+orig]){
    if(fs.existsSync(p)){ freed+=fs.statSync(p).size; fs.unlinkSync(p); n++; }
  }
  console.log('obrisano: '+a.replace('assets/',''));
}
console.log('\nFajlova obrisano: '+n+' | Oslobodjeno: '+(freed/1048576).toFixed(0)+' MB');
