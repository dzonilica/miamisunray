const fs=require('fs');
const map={
 '1b4013_ec5b070c1ed046449c7cbf510fa7ab97~mv2.png':'logo/sunray-logo-inverted-800x600.png',
 '81af6121f84c41a5b4391d7d37fce12a.png':'logo/icon-instagram-200.png',
 '1b4013_7d9e3d4b2bd040b29ef580a9449e1134~mv2.png':'about/storefront-logo-signage-1500x1000.png',
 '1b4013_13adda8da24a4a05838ae5718d7920d6~mv2.jpg':'about/sunray-2.jpg',
 '1b4013_412cbc02161a4f4589808875753ba1d1~mv2.jpeg':'contact/company-door-3d.jpeg',
 '1b4013_3fd9b1225793423dadb4648d253890db~mv2.png':'hero/financing-envelope-in-hand.png',
 '1b4013_e72c017e8f7d497cbcd2362c4bac813a~mv2.jpg':'payments/credit-cards.jpg',
 '11062b_b38271d78c50469db06a7e0adc05e373~mv2.jpeg':'hero/modern-style-pool-villa.jpeg',
 'd7f019a0e0ef4cfb83f63dab7b09ecfe.jpg':'hero/aerial-patio-view.jpg',
 'nsplsh_8ec94346ab7e49dfb5ef69e164d5355a~mv2.jpg':'services/custom-homes.jpg',
 '11062b_51909333fe5d4c52a275479484b8fae0~mv2.jpeg':'services/impact-doors-windows-hallway.jpeg',
 'nsplsh_1b3bcc795acd43319aaf16ef7fd47506~mv2.jpg':'services/roofing.jpg',
 '11062b_b6d84e456b944dc9a0af286496c80a2f~mv2.jpg':'services/solar-panels.jpg',
 'd55c98a6943b4bfca1aa29b521b22092.jpg':'services/demolition-bulldozer.jpg',
 '11062b_bbe8c1c80d7746379a4e00c8ec611199~mv2.jpg':'services/pool-house.jpg',
 '11062b_a792f2aac2a348cba548294b8bad64f2~mv2.jpg':'services/painting-paint-roll.jpg',
 '11062b_9b2d4c1a100b42b29c1a980348327254~mv2.jpg':'services/landscaping-tropical-garden.jpg',
 '93329f34d0d44f7b8c3b2234ff583a8d.jpg':'services/driveway-modern-garage.jpg',
 '7e4a1c05c6e040f28df61a4686e5eff9.jpg':'services/air-conditioning-thermostat.jpg',
 'a177809f319d47258186bcf5532bb5ba.jpg':'services/additions-wooden-framing.jpg',
 'nsplsh_ce2448148c2f46a4bf32a0d9e8fce0f3~mv2.jpg':'services/concrete-work.jpg',
 '62adbcec8fc243d0b710789bb01af4a1.jpg':'services/ducts-air-filter.jpg',
 'nsplsh_38504b4565616331687a77~mv2_d_6000_3376_s_4_2.jpg':'services/excavation.jpg',
 '11062b_9f5384515841448e87d7adc49e1bbfee~mv2.jpeg':'services/commercial-buildouts-awning.jpeg',
 '11062b_45f9d2ba637e437eabf7eeae2cb05d58~mv2.jpg':'services/permits-engineering-architect.jpg',
};
for(const [src,dst] of Object.entries(map)){
  if(!fs.existsSync('images/'+src)){console.log('MISSING '+src);continue;}
  fs.copyFileSync('images/'+src,'assets/'+dst);
  console.log(dst.padEnd(52),(fs.statSync('images/'+src).size/1024).toFixed(0)+' KB');
}
