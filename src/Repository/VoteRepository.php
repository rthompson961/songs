<?php

namespace App\Repository;

use App\Entity\Vote;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Vote|null find($id, $lockMode = null, $lockVersion = null)
 * @method Vote|null findOneBy(array $criteria, array $orderBy = null)
 * @method Vote[]    findAll()
 * @method Vote[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vote::class);
    }

    public function findVotes()
    {
        return $this->createQueryBuilder('v')
            ->innerJoin('v.song', 's')
            ->select('v.id')
            ->addSelect('s.artist')
            ->addSelect('s.title')
            ->addSelect('v.quantity')
            ->orderBy('v.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findTotals()
    {
        return $this->createQueryBuilder('v')
            ->innerJoin('v.song', 's')
            ->select('s.id')
            ->addSelect('s.artist')
            ->addSelect('SUM(v.quantity) AS count')
            ->groupBy('s.id')
            ->orderBy('count', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }
}
