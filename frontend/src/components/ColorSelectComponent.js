import React from 'react'

const ColorSelectComponent = ({ size, color = [], setColor, name, setName, dimensions, setDimensions, price, setPrice }) => {

    const addColorsToArray = (e) => {
        if (e.target.checked) {
            setColor([...color, e.target.value])
        } else {
            setColor(color.filter((x) => x !== e.target.value))
        }
    }

   
    return (
        <form>
            <div className="mb-3">

                <div className=" ml-3">
                    <div className="form-check">
                        <input class="form-check-input" type="checkbox" value={size} id={size}

                            onChange={(e) => {
                                if (name !== size) {
                                    setName(e.target.value)
                                } else {
                                    setName("")
                                    setColor("")
                                    setName("")
                                    setDimensions("")
                                    setPrice("")
                                }
                            }}
                            checked={name === size ? true : false}
                        />
                        <label class="form-check-label" for={size}>
                            {size}
                        </label>
                    </div>
                    <div className='mt-3'>
                        Choose Colors
                    </div>
                    <div>
                        <div className="colorOptions form-check">
                            <input class="form-check-input" type="checkbox" value="red" id="red"
                                onChange={(e) => addColorsToArray(e)} disabled={name !== size ? true : false}
                                checked={color.includes('red') ? true : false}
                            />
                            <label label class="form-check-label" for="red">
                                Red
                      </label>
                        </div>

                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" value="black" id="black"
                                onChange={(e) => addColorsToArray(e)} disabled={name !== size ? true : false}
                                checked={color.includes('black') ? true : false}
                            />
                            <label class="form-check-label" for="black">
                                Black
                    </label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" value="white" id="white"
                                onChange={(e) => addColorsToArray(e)} disabled={name !== size ? true : false}
                                checked={color.includes('white') ? true : false}
                            />
                            <label class="form-check-label" for="white">
                                White
                      </label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" value="mint" id="mint"
                                onChange={(e) => addColorsToArray(e)} disabled={name !== size ? true : false}
                                checked={color.includes('mint') ? true : false}
                            />
                            <label class="form-check-label" for="mint">
                                Mint
                      </label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" value="terracota" id="terracota"
                                onChange={(e) => addColorsToArray(e)} disabled={name !== size ? true : false}
                                checked={color.includes('terracota') ? true : false}
                            />
                            <label class="form-check-label" for="terracota">
                                Terracota
                      </label>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Dimensions</label>
                        <input type="text" class="form-control" value={dimensions} id="dimensions" placeholder="Enter product dimensions" disabled={name === "" ? true : false} onChange={(e) => {

                            setDimensions(e.target.value)

                        }} />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Price</label>
                        <input type="number" class="form-control" id="price" value={price} placeholder="Enter price" disabled={name === "" ? true : false} onChange={(e) => {

                            setPrice(e.target.value)

                        }} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ColorSelectComponent
