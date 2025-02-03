'use client'

export function Newsletter (){
    return(
        <>
        <div className="flex flex-col py-5 text-center gap-4 bg-green-100 text-green-300 rounded">
            <div className="md:flex-1 lg:w-full">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold p-5">Stay Updated</h3>
              <p className="text-xs md:text-sm lg:text-base px-5 text-primary-200">
                Subscribe to our newsletter for exclusive offers and updates
              </p>
            </div>
            <form className="flex flex-col lg:flex-col md:items-center lg:items-stretch gap-2 px-5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="text-xs md:text-sm lg:text-base border border-1 rounded-md p-2 md:flex-1 lg:w-full bg-primary-700 placeholder-primary-300"
              />
              <button 
                type="submit"
                className="text-xs md:text-sm lg:text-base bg-green-300 text-white rounded-md p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:origin-bottom-left"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs md:text-sm lg:text-base">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

        </>
    )
}

