import React from 'react';
import { Card, Image } from 'react-bootstrap';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import image from '../../assets/png/az.jpg'; 

const Home = () => {
  const slides = [
    { id: 1, title: 'Историческая литература', description: 'Описание категории "Историческая литература".', image: 'ist.jpg' },
    { id: 2, title: 'Русская классика', description: 'Описание категории "Русская классика".', image: 'rk.jpg' },
    { id: 3, title: 'Фантастика', description: 'Описание категории "Фантастика".', image: 'pot.jpg' },
    { id: 4, title: 'Романтика', description: 'Описание категории "Романтика".', image: 'na.jpg' },
    { id: 5, title: 'Научные книги', description: 'Описание категории "Научные книги".', image: `az.jpg` },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={`${styles.lt} center`}>
          <h2>Категории</h2>
        </div>
        <div className={styles.slider}>
          {slides.map(slide => (
            <div key={slide.id} className={styles.card}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <a href={`#ganr_${slide.id}`}>{slide.title}</a>
                  </Card.Title>
                  <Card.Text>
                    {slide.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {slides.map(slide => (
        <div key={slide.id} className={styles.ganr} id={`ganr_${slide.id}`}>
          <Link to={`/card`}>
            <h3>{slide.title}</h3>
          </Link>
          <div>
            <Image src={`/png/${slide.image}`} fluid className={styles.cardImage} />
            <p><strong>Великолепная</strong> <i>книга</i></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;