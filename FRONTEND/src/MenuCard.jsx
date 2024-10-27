import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import './style.css';

const MenuCard = ({menuData}) => {

    const Navigate = useNavigate();

    const gotoCart = (ID, Name, CategoriesName, Price, Descreption, image, Count) => {
        const data = ({
            ID: ID,
            Name: Name,
            CategoriesName: CategoriesName,
            Price: Price,
            Descreption: Descreption,
            image: image,
            Count: 1
        })
        const olddata = JSON.parse(localStorage.getItem('Card'));
        if (olddata == null) localStorage.setItem('Card', JSON.stringify([data]));
        else if (olddata !== null) localStorage.setItem('Card', JSON.stringify([...olddata, data]))
        Navigate('/Cart');
    }
    return (
        <>
            <section className='main-card--cointainer'>
                {menuData.map((curElem) => {
                    const { ID, Name, CategoriesName, Price, Descreption, image, Count } = curElem;
                    return (
                        <>
                            <div className='card-container'>
                                <div className='card' key={ID}>
                                    <div className='card-body'>
                                        <h2 className='card-title'>{Name}</h2>
                                        <span className='card-description subtle'>
                                            {Descreption}
                                        </span>
                                        </div>
                                        <img src={'http://localhost:8000/CreateImage/' + image} alt="images" className='card-media' />
                                        <div className='btn-pric'>
                                            <span className='card-autor subtle'>
                                                <FaIndianRupeeSign /> {Price}
                                            </span>
                                            <button className='buttone' onClick={() => gotoCart(ID, Name, CategoriesName, Price, Descreption, image, Count)}>Add Cart</button>
                                        </div>
                                    </div>
                                </div>
                        </>
                    )
                })}
            </section>
        </>
    )
}

export default MenuCard