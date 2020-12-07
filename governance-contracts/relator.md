bug ABI ParameterStore.ts
```
  Write types to generated/ParameterStore/ParameterStore.ts
✖ Failed to generate types for contract ABIs: Failed to generate types for contract ABI: '(' expected. (64:12)
  62 |   }
  63 | 
> 64 |   get va   lue(): BigInt {
     |            ^
  65 |             return this._event.parameters[2].value.toBigInt()
  66 |             
  67 |   
```