import DesignStudioCanvas from '@/components/DesignStudioCanvas'
import styles from '@/components/DesignStudioCanvas.module.css'

export default function DesignStudioPage() {
  return (
    <main className={styles.pageWrapper}>
      {/* <h1 className="text-4xl font-bold mb-8">Design Studio</h1> */}
      <DesignStudioCanvas />
    </main>
  )
} 