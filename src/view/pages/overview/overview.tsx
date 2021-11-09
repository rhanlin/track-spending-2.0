import 'twin.macro'
import { useEffect } from 'react'

import { GOOGLE_SHEET_URL } from '@view/constants/connect'
// import { useQuery, useMutation, useQueryClient } from 'react-query'

function OverviewPage() {
  const init = async () => {
    const body = {
      name: 'Spencer',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    }
    const url = `${GOOGLE_SHEET_URL}?queryType=record`

    try {
      const Options = {
        method: 'POST',
        body: JSON.stringify(body)
      }
      const response = await fetch(url, Options)
      const { data } = await response.json()
      console.log('data', data)

      return data
    } catch (error) {
      throw new Error(`fetch google api fail:>>> ${error}`)
    }
  }

  useEffect(() => {
    init()
  }, [])
  // Access the client
  // const queryClient = useQueryClient()

  // Queries
  // const query = useQuery('userInfo', getUserInfo)

  // Mutations
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('userInfo')
  //   },
  // })

  return <div>OverviewPage</div>
}

export default OverviewPage
