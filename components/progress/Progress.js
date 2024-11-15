import NextTopLoader from 'nextjs-toploader'

const Progress = () => {
  return (
    <>
      <NextTopLoader
        color="#6e38f5"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #6e38f5,0 0 5px #6e38f5"
      />
    </>
  )
}

export default Progress
