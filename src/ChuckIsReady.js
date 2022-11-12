import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './index.css';
import { setCategory, setJokes } from './store/Chuck/ChuckActCreat';
import { selectCategory, selectJokes } from './store/Chuck/ChuckSelector';

function ChuckIsReady() {
    const dispatch = useDispatch()
    const CATEGORIES = useSelector(selectCategory)
    const CATJOKES = useSelector(selectJokes)
    const [randomJoke, setRandomJoke] = useState('')
    const [choosen, setChoosen] = useState(null)
    const [JokeCounter, setJokeCounter] = useState(1)
    const [realTimeJoke, setRealTimeJoke] = useState(null)
    const [rand, setRand] = useState(false)
  


  

    useEffect(() => {

       console.log(CATJOKES, 'JOKES ARRAY')
       //აქედან ჩანს რომ ერეის ვზრდი ხუმრობების მატების მიხედვით, კონკრეტულ სეგმენტზე დაჭერითაც და Next 
       //დაჭერის შემთხვევაშიც რითაც ახალ რენდომ ხუმრობას ვტვირთავ ბოლო კატეგორიიდან
       //შესაბამისად ერეისაც ვზრდი იმისთვის რო სრული ნანახი დატის გადათვალიერება იყოს შესაძლებელი
      }, [CATJOKES])

      useEffect(() => {
        setRealTimeJoke(CATJOKES.at(-JokeCounter))
        //აქედან ვსეტავ ახლანდელ დროში რეალურად წამოღებულ ბოლო ხუმრობას ყოველი კატეგორიის არჩევაზე
        //გამოყენებულია ერეის -1 პრინციპი რითიც ერეიში მყოფი ინდექსით ბოლოს ჩამატებულ დატას ვიღებთ
      }, [choosen])

      useEffect(() => {
         if (choosen !== null) {
             setRealTimeJoke(CATJOKES.at(-JokeCounter))
         }
         //აქედან ვსეტავ ისევ რეალურ დროში ბოლოს წამოღებულ ხუმრობას ოღონდ იმ შემთხვევაში თუ კატეგორია არჩეული არ არის
        //გამოყენებულია ერეის -1 პრინციპი რითიც ერეიში მყოფი ინდექსით ბოლოს ჩამატებულ დატას ვიღებთ

      }, [JokeCounter])

      useEffect(() => {
          if(realTimeJoke == undefined || realTimeJoke == null || realTimeJoke == NaN){
              setChoosen(null)
          } 

          //აქედან ვსეტავ კატეგორია არჩეული 'არაა'-ს  იმ დროს როცა Prev გადასვლით დატა სრულდება
          //და კატეგორიის მონიშვნას ვხსნი და რენდომ ხუმრობას ვტვირთავ მხოლოდ
          
      }, [realTimeJoke])
      
      
      
    


    useEffect(() => {
      fetch('https://api.chucknorris.io/jokes/categories')
  .then(response => response.json())
  .then(json => {
      
      dispatch(setCategory(json))
  }
    )
    //აქედან კატეგორიებს ვსეტავ რედაქსში
    }, [])

    useEffect(() => {
        fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(json => {
        setRandomJoke(json.value)
    }
      )
      //აქედან რენდომ ხუმრობას ვსეტავ ჰუკში
      }, [CATJOKES, rand])


      const SelectCat = (val, idx) => {
          if(val ) {
            fetch(`https://api.chucknorris.io/jokes/random?category=${val}`)
            .then(response => response.json())
            .then(json => {
                setChoosen(idx)
                dispatch(setJokes(json
                ))
                if(choosen == idx) {
                    setChoosen(null)
                }
            }
              )

          } else  {
              let CATEGOR = CATJOKES.at(-1)

            fetch(`https://api.chucknorris.io/jokes/random?category=${CATEGOR.categories[0]}`)
            .then(response => response.json())
            .then(json => {
                setChoosen(choosen)
                dispatch(setJokes(json
                ))
            }
              )
          }

          //ესაა ფუნქცია რომელიც ტვირთავს ხუმრობებს კატეგორიის მიხედვით და ეშვება ორ შემთხვევაში
          //პირველი შემთხვევა არის როცა უბრალოდ კატეგორიას ვირჩევთ იტვირთება შესაბამისი რენდომ ხუმრობა
          //მეორე შემთხვევა არის ის როცა Next-ით გადავდივართ შემდეგ ხუმრობაზე მაგრამ დატა აღარ გვაქვს,
          //ამ დროს ვიყენებთ ჰუკებში შენახულ ინფორმაციას (კატეგორიის სახელს და ინდექსს) იმისთვის რო კატეგორიის შედარება
          //და შესაბამისი რენდომ ხუმრობის წამოღება ხელახლა მოხდეს
       

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
                setJokeCounter(JokeCounter + 1)   
                //Prev შემთხვევაში +1 გასაკვირია მაგრამ ერეის -1 პრინციპის მიხედვით ასე ვალაგებ ინდექსებს
         }
            } className='BTN'>Prev</button>
         <button onClick={() => {
                if (choosen == null) {
                    setRand(true)
                    if(rand == true)
                    setRand(false)
                } else {
                    setJokeCounter(JokeCounter - 1)
                    SelectCat()
                }     
        }
            } className='BTN'>Next</button>
       </div>
       <div className='Joke'>
        <h4 className='JokeTXT'>
            {choosen !== null && realTimeJoke !== null && realTimeJoke !== undefined ? (realTimeJoke.value) : (randomJoke)
            }
            {/* ეს ლოგიკაა რის მიხედვითაც გამოგვაქვს რენდომ ხუმრობა ან კატეგორიის რენდომ ხუმრობა */}
        </h4>
       </div>
       <div className='Categories'>
         <h3 className='headOfCat'>Categories :</h3>
         <div className='CatList'>
             <ul>

         {CATEGORIES.map((data, idx) => {
             if (idx < 5)
             return (
                 <li onClick={() => SelectCat(data, idx)} key={idx} className={idx == choosen ? ('CatTitle1') : ('CatTitle')}>
                  {/* კლას ნეიმში მცირე ლოგიკაა რის მიხედვითაც ვადარებ აიდებს და ვიღებ გასამწვანებელ კატეგორიას */}
                     {data}
                     </li>
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
