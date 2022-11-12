import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './index.css';
import { delJokes, setCategory, setJokes } from './store/Chuck/ChuckActCreat';
import { selectCategory, selectJokes } from './store/Chuck/ChuckSelector';

function ChuckIsReady() {
    const dispatch = useDispatch()
    const CATEGORIES = useSelector(selectCategory)
    const CATJOKES = useSelector(selectJokes)
    const [randomJoke, setRandomJoke] = useState('')
    const [choosen, setChoosen] = useState(null)
    const [JokeCounter, setJokeCounter] = useState(1)
    const [realTimeJoke, setRealTimeJoke] = useState(null)
    const [nextJoke, setNextJoke] = useState(0)
  


    useEffect(() => {
    }, [CATEGORIES])

    useEffect(() => {

       console.log(CATJOKES, 'JOKES ARRAY')
      }, [CATJOKES])

      useEffect(() => {
        setRealTimeJoke(CATJOKES.at(-JokeCounter))
      }, [choosen])

      useEffect(() => {
         if (choosen !== null) {
             setRealTimeJoke(CATJOKES.at(-JokeCounter))
         }
      }, [JokeCounter])

      useEffect(() => {
          if(realTimeJoke !== undefined && realTimeJoke !== null){

              console.log(realTimeJoke.value, 'EGIA JOUQI')
          } else {
              setChoosen(null)
             

              console.log('euf')
          }
      }, [realTimeJoke])
      
      
      
    


    useEffect(() => {
      fetch('https://api.chucknorris.io/jokes/categories')
  .then(response => response.json())
  .then(json => {
      
      dispatch(setCategory(json))
  }
    )
    }, [])

    useEffect(() => {
        fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(json => {
        setRandomJoke(json.value)
    }
      )
      }, [CATJOKES, nextJoke])


      const SelectCat = (val, idx) => {
        fetch(`https://api.chucknorris.io/jokes/random?category=${val}`)
        .then(response => response.json())
        .then(json => {
            console.log(json, 'val')
            setChoosen(idx)
            dispatch(setJokes(json
            ))
            if(choosen == idx) {
                setChoosen(null)
               console.log('neta aq ara')

                

            }
        }
          )

      }


    

    


  return (
    <div className="App">
      <div className='head'>
        <h3>
          Jokes API
          </h3>
          <img src={'https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png'} alt='Chucks Photo' className='ChucksIMG'/>
      </div>
      <div className='bodY'>
       <div className='Btns'>
         <button onClick={() => {
                console.log(JokeCounter, 'COUNT')
                setJokeCounter(JokeCounter + 1)
             
         }
            } className='BTN'>Prev</button>
         <button onClick={() => {
                if (JokeCounter -  1 == 0){
                    
                   
                } else {
                    console.log(JokeCounter, 'QOUNT +')
                    setJokeCounter(JokeCounter - 1)
                }
             
        }
            } className='BTN'>Next</button>
       </div>
       <div className='Joke'>
        <h4 className='JokeTXT'>
            {choosen !== null && realTimeJoke !== null && realTimeJoke !== undefined ? (realTimeJoke.value) : (randomJoke)
            }
        </h4>
       </div>
       <div className='Categories'>
         <h3 className='headOfCat'>Categories :</h3>
         <div className='CatList'>
             <ul>

         {CATEGORIES.map((data, idx) => {
             if (idx < 5)
             return (
                 <li onClick={() => SelectCat(data, idx)} key={idx} className={idx == choosen ? ('CatTitle1') : ('CatTitle')}
                 
                 >{data}</li>
                 
                 )
                 
                 
                 
                })
            }
            </ul>

         </div>
       </div>
          

        

        </div>
    </div>
  );
}

export default ChuckIsReady;
