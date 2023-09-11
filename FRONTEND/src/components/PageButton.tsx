type PageProps = {
  pg: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  isPreviousData: boolean
}

const PageButton = ({ pg, setPage, isPreviousData }: PageProps) => {
  return (
    <button onClick={() => setPage(pg)} disabled={isPreviousData}>
      {pg}
    </button>
  )
}

export default PageButton
