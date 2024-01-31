import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Welcome to 
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center head_text"> DevDart</span>
        </h1>
        <p className="desc text-center">
            Want to build your own website? Book a call now!
        </p>
        
        <Feed/>
    </section>
  )
}

export default Home