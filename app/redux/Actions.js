import { useDispatch } from 'react-redux'
import { submitFormData } from './store'

function Form({ formData }) {
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(submitFormData(formData))
    }

    return (
        <View>
            {/* form inputs */}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    )
}


// import { useSelector } from 'react-redux'

// function NextScreen() {
//     const submitCount = useSelector(state => state.form.submitCount)

//     return (