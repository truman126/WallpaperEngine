import average from '../../assets/images/average.png'

export function ImageRadios() {

    return (
        <ul class="grid w-full gap-6 md:grid-cols-2">
            <li>
                <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required />
                <label for="hosting-small" class="inline-flex items-center justify-between w-1/3 p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className='w-full' src={average} />
                    
                    {/* <div class="block">
                        <div class="w-full text-lg font-semibold">0-50 MB</div>
                        <div class="w-full">Average Colour</div>
                    </div> */}
                    
                </label>
            </li>
             <li>
                <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required />
                <label for="hosting-small" class="inline-flex items-center justify-between w-1/3 p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className='w-full' src={average} />
                    
                    {/* <div class="block">
                        <div class="w-full text-lg font-semibold">0-50 MB</div>
                        <div class="w-full">Average Colour</div>
                    </div> */}
                    
                </label>
            </li> <li>
                <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required />
                <label for="hosting-small" class="inline-flex items-center justify-between w-1/3 p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className='w-full' src={average} />
                    
                    {/* <div class="block">
                        <div class="w-full text-lg font-semibold">0-50 MB</div>
                        <div class="w-full">Average Colour</div>
                    </div> */}
                    
                </label>
            </li>
        </ul>
    );
}