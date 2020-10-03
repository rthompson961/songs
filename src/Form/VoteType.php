<?php

namespace App\Form;

use App\Entity\Song;
use App\Entity\Vote;
use Symfony\Component\Form\AbstractType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class VoteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('song', EntityType::class, [
            'class'  => Song::class,
            'choice_label' => function ($song) {
                return $song->getArtist() . ' - ' . $song->getTitle();
            },
            'attr' => ['class' => 'mb-2 mr-sm-2'],
            'label' => false
        ]);

        $builder->add('quantity', ChoiceType::class, [
            'choices'  => [1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5],
            'attr' => ['class' => 'mb-2 mr-sm-2'],
            'label' => false
        ]);

        $builder->add('submit', SubmitType::class, [
            'attr' => ['class' => 'btn btn-primary mb-2'],
            'label' => 'Vote'
        ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['data_class' => Vote::class]);
    }
}
