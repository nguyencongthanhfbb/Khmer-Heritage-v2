import { metCrawler } from '../server/crawler/metCrawler';
import { multiSourceManager } from '../server/crawler/multiSourceManager';

async function main() {
  console.log('🏛️ Bắt đầu tiến trình thu thập và chuẩn hóa dữ liệu di sản Đa Nguồn (Khmer Heritage Multi-Institution Pipeline)...');
  console.log('📡 Nguồn nạp: The Met, Smithsonian Open Access, Library of Congress, Wikimedia Commons & Internet Archive');

  try {
    const multiResult = multiSourceManager.runMultiSourceIngest();
    console.log(`\n✅ Hợp nhất và thẩm định thành công ${multiResult.totalObjects} đối tượng di sản đa viện bảo tàng!`);
    console.log('📁 Dữ liệu được lưu tại: src/data/crawledMuseumData.json');
    console.log('📊 Phân loại thể loại:', multiResult.corpusByType);
  } catch (error) {
    console.error('❌ Thất bại:', error);
    process.exit(1);
  }
}

main();
