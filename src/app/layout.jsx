import '@styles/global.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
//everything is a functional component, which has a return statement that lets u use HTML
//rmb to export the component so it can be used in otehr files
export const metadata = {
    title: "Admin Dashboard",
    description: 'CPS714 project '
}

/*the {children} prop lets react render nested components in the HTML.
Essentially lets u write nested HTML stuff in page.jsx like how u typically would.
typically will require prop.children but below is better 
*/

const RootLayout = ({children}) => {
  return (
    <html lang="en"> 
        <body>
            <div className='main'>
                <div className='gradient'>
                     </div>
                <main className='app'>

                    {children}
                </main>
            </div>
        </body>
    </html>
  )
}

export default RootLayout;