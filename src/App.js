import React from 'react';
import {useQuery, QueryClientProvider, QueryClient} from '@tanstack/react-query'

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export default function App(props) {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}><Parent/></QueryClientProvider>;
}

const Parent = () => {

  const response = useQuery(["users"], fetchUsers, { placeholderData: {}, enabled: false});

  const [state1, setState1] = React.useState(1)
  const [state2, setState2] = React.useState(10)

  return <div>
    <Child1 value1={state1} callBackToUpdateParentState={(value) => setState2(value)}/>
    <Child2 value2={state2}/>
  </div>

}
const Child1 = ({value1, callBackToUpdateParentState}) => {
  const [childValue, setChildValue] = React.useState(1)

  console.log('render Child1')

  React.useEffect(() => {
    console.log('Child1 component did update')
    callBackToUpdateParentState(childValue)
    console.log('callBackToUpdateParentState just called from Child1')
  })

  return <div>
    Child1 : {value1}<br/>
    ChildValue1 : {childValue}<br/>
    <button onClick={() => {
      console.log("Click")
      setChildValue(99)
    }}>Click</button>
  </div>
}

const Child2 = ({value2}) => {
  console.log('render Child2')

  return <div style={{color: "white"}}>Child2 : {value2}</div>
}

