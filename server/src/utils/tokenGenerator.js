import jsonwebtoken from 'jsonwebtoken'

const toeknGenerator = ({data}) => {
 const token = jsonwebtoken.sign(data, process.env.SECRET_KEY, {expiresIn:'24h'})

 return token
}

export {
  toeknGenerator
} 