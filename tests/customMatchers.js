const customMatchers ={}

export const toEqualFunction = (util, customEqualityTesters) =>{

  return {
    compare: (actual, expected) => {
      let result = {};

      const expectValid = (expected !== undefined && (typeof expected === 'function'));

      const actualValid = (actual !== undefined && (typeof actual === 'function'));

      if (!expectValid) {
        result.message =  'Expected '+expected+' to be Function and not null';
        result.pass = false;
      };

      if(!actualValid){
        result.message =  'Expected '+actual+' to be Function and not null';
        result.pass = false;
      };

      if(actualValid && expectValid){

        if(actual.name === expected.name){
          result.pass = true;
        }

        if (result.pass) {

          result.message = "The function "+actual.name+" is equal to the function"+ expect.name;
        } else if(!result.message){

          result.message = "Expected function " + actual + " is not equal to "+ expected;
        };

      };

      return result;
    }
  };

};

customMatchers.toEqualFunction = toEqualFunction;

export const addMatcher = (mathcher) => {
  if(typeof mathcher === 'function'){
    let objMatcher = {};

    objMatcher[mathcher.name] = mathcher;

    jasmine.addMatchers(objMatcher);
  }else{

    throw 'The mathcher need to be a function';
  }
};

export const addAllCustomMatchers = () => {
  jasmine.addMatchers(customMatchers);
};

export default customMatchers;
