import { metCrawler } from '../server/crawler/metCrawler';

async function main() {
  console.log('🏛️ Bắt đầu tiến trình thu thập và chuẩn hóa dữ liệu di sản (Khmer Heritage Ingestion Pipeline)...');
  console.log('📡 Nguồn nạp: The Metropolitan Museum of Art (The Met Open Access API - CC0)');

  try {
    const results = await metCrawler.runBatchCrawl(
      ['Khmer', 'Angkor', 'Cambodia', 'Harihara', 'Jayavarman', 'Prajnaparamita', 'Bayon', 'Ganesha'],
      35
    );
    console.log(`\n✅ Thu thập thành công ${results.length} hiện vật bảo tàng chính thức!`);
    console.log('📁 Dữ liệu được lưu tại: src/data/crawledMuseumData.json');
  } catch (error) {
    console.error('❌ Thất bại:', error);
    process.exit(1);
  }
}

main();
