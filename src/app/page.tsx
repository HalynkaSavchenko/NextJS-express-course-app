import styles from "./page.module.css";
import course from './course.json';
import { Lesson } from "./lesson";
import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('./some-component'), {ssr: false})

async function getAllCourses(): Promise<typeof course> { return new Promise((resolve) => {
  setTimeout(() => resolve(course), 1000)
})
  
}

export default async function Home() {
  const courses = await getAllCourses();
  return (
      <main className={styles.main}>
        <ClientComponent/>
          <ul>
            {courses.lessons.map((lesson) => {
              return <li key={lesson.name}>
               <Lesson title={lesson.title} shortSummary={lesson.shortSummary}/>
              </li>
            })}
          </ul>
      </main>
        
  );
}
