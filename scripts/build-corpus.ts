import { museumCorpusPipeline } from '../server/pipeline/index';

async function main() {
  try {
    const result = museumCorpusPipeline.runPipeline();
    console.log(`\n🎉 Corpus generation finished with ${result.totalObjects} verified objects!`);
  } catch (error) {
    console.error('❌ Pipeline failed:', error);
    process.exit(1);
  }
}

main();
