import { Component } from 'react';

type IUser = {
    name: string
    age: number
}

type IProps = {
    user: IUser
}

// functional component
// тут мы мемоизируем компонент, так как нам приходят примитивные типы данных
const FirstComponent = memo(({ name, age }: IUser) => (
    <div>
        my name is {name}, my age is {age}
    </div>
));

// functional component
// Этот компонент является необязательным для выполнения задания, но продемонстрирует глубину знаний в React.
// тут уже не получится просто обернуть компонент в memo так как нам приходит обьект, и надо явно сравнивать его значения
// воспользуюсь вторым аргументам memo в котором приходят предыдующие и след состояние
// так же конечно лучше было бы что бы компонент принимал примитивные данные
// и можно еще внешний результат обьекта user с помощью useMemo кэшировать
const SecondComponent = memo(({ user: { name, age } }: IProps) => (
    <div>
        my name is {name}, my age is {age}
    </div>
), (prevProps: IProps, nextProps: IProps) => {
    return prevProps.user.name === nextProps.user.name && prevProps.user.age === nextProps.user.age;
});

// class component
// в классовых компонентов надо расшириться не от просто компонента, а от чистого PureComponent который делает поверхностное сравнение
class ThirdComponent extends PureComponent<IUser> {
    render() {
        return (
            <div>
                my name is {this.props.name}, my age is {this.props.age}
            </div>
        )
    }
}

// class component
// тут можно применить метод жизненного цикла shouldComponentUpdate в котором можно проверить текущие состояние с будущим
// и от этого давать понять обновлять компонент или нет
class FourthComponent extends Component<IProps> {
    shouldComponentUpdate(nextProps: IProps, _) {
        return this.props.user.name === nextProps.user.name && this.props.user.age === nextProps.user.age
    }
    render() {
        return (
            <div>
                my name is {this.props.user.name}, my age is {this.props.user.age}
            </div>
        )
    }
}